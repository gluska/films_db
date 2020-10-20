const express = require("express"); //import Express
const router = express.Router();
const path = require('path');
const bodyparser = require("body-parser");
const mongo = require('mongodb');
const app = express(); //start App
const fetch = require('node-fetch');
const port = 3000; //Assign port
const mongoClient = mongo.MongoClient;
const url = "mongodb+srv://tester_1:xxx111@cluster0-ecz9u.gcp.mongodb.net/test?retryWrites=true&w=majority";
const ObjectId = require('mongodb').ObjectId; 
const session = require('express-session');
const { Console } = require("console");

//ustawienie że moja aplikacja musi korzystać z silnika szablonów 'hbs'
app.set("view engine", 'hbs');
// app.engine('hbs', hbs({
//   extname: 'hbs',
//   defaultLayout: 'index',
//   layoutsDir: __dirname + '/views/',
//   helpers: { json: (context) => JSON.stringify(context) }
// }));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

 //przypisujemy akcję do endpointu '/'
app.get('/',(req,res) => {
  res.render('index',{ })
});

app.get('/register',(req,res) => {
  res.render('register_films_form',{ })
});

app.get('/find',(req,res) => {
  res.render('find_form',{ })
});

app.get('/edit1Film',(req,res) => {
  res.render('index',{ })
});

// var regTitle = "";
// var regDirector= "";
// var regProdYear = "";

//----------------- dodanie nowego filmu  ---------
app.post("/regToServer",(req, res) => {
  let regTitle = req.body.r_title;
  let regDirector= req.body.r_director;
  let regProdYear = req.body.prodYear;
  
  console.log(`Przesłałeś do serwera ${regTitle}, ${regDirector}, ${regProdYear}`);
  const dbname = 'db_university';
  mongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
        if (err) throw err;
        const db = client.db(dbname);
        db.collection("films").insertOne(
                              {
                                title: regTitle,
                                director: regDirector,
                                prod_date: regProdYear
                                },
                              (error, result) => {
                                if(error){console.log("error when inserting", error)};
                                console.log(`dodano film: ${regTitle} do bazy!`);
                                client.close();
                              }
                            );         
              
  });
  
      console.log("udane połączenie z bazą");
    //wyświetl widok 'register_films_form.hbs' i przekaż zmienne wskazane w {}
      res.render('register_films_form',{
        Confirmation1: 'Dodano film do bazy'

       })

});

//-----------------------------------------------------------------------------------
var searchedFilms;
//----------------- wyszukanie filmu  ---------
app.post("/findFilm",(req, res) => {
  let searchTitle = req.body.f_title;
  let searchDirector= req.body.f_director;
  let searchProdYear = req.body.f_prodYear;
  let searchActors = req.body.f_act;
  //searchProdYear = searchProdYear.toString();
  //console.log(searchProdYear);
  console.log(`Przesłałeś do serwera ${searchTitle}, ${searchDirector}, ${searchProdYear}, ${searchActors}`);
  const dbname = 'db_university';
  mongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
        if (err) throw err;
        const db = client.db(dbname);
        
        // //znajdź wszystkie wpisy bez filtra
        // db.collection("films").find(
        //   {}
        //   )

        //szukanie z 1 warunkiem i regexem
        // db.collection("films").find(
        //   { "title": { $regex: searchTitle, "$options": "i"  } //zawierające w tytule szukany fragment
        //   }
        //   )
         
        //szukanie z 1 warunkiem i regexem - wersja 2
        // db.collection("films").find(
        //     { actors: { $regex: searchActors, "$options": "i"  } //zawierające w tytule szukany fragment
        //     }
        //     )
        //szukanie po kilku warunkach


        db.collection("films").find({
          "$or": [
          {title: { $regex: searchTitle, "$options": "i"  }}, //zawierające w tytule szukany fragment
          {director: {$regex: searchDirector, "$options": "i" }},
          {prod_date: {$regex: searchProdYear, "$options": "i" }},
             {actors: {$regex: searchActors, "$options": "i" }}
          ]
          })

        // db.collection("films").find({
        //   "$and": [  //oraz - warunki muszą być spełnione jednocześnie
        //     {title: { $regex: searchTitle, "$options": "i"  }},  //zawierające w tytule szukany fragment
        //     {director: {$regex: searchDirector, "$options": "i" }}, //zawierające w tytule szukany fragment 
        //     {prod_date: {$regex: searchProdYear, "$options": "i" }},
        //     {actors: {$regex: searchActors, "$options": "i" }}
        //     ]
        //   })
        .toArray(function(err, result) {
          if (err) throw err;
          //console.log(result);
          //console.log(`wyszukano film: ${result[2].title}`);
          //searchedTitle = result[0].title;
          searchedFilms = result; //tablica obiektów JSON

          var resultTitleArr = []; 
          searchedFilms.forEach(element => {
            resultTitleArr.push(element.title);
          });
          var resultTitleArrEx = resultTitleArr.join(",");
          client.close();

          res.render('find_form',{
            list:  searchedFilms,
            zmiennaNode: "testowa2020",
            resultTitleArrEx: resultTitleArrEx
          });
  
        });


              
  });
  
      console.log("udane połączenie z bazą");
      console.log(JSON.stringify(searchedFilms));
    
}); // koniec obsługi endpointu "/findFilm"

//=========================  otwarcie formularza edycji filmu o określonym id  ========

var editID = "";
app.post("/editFilm_enter_form",(req, res) => {
  let editID = req.body.idToEdit;
  let editTitle = req.body.titleToEdit;
  let editDirector = req.body.directorToEdit;
  let editPrDt = req.body.prdtToEdit;
  let editActors = req.body.actorsToEdit;
  

  console.log("kliknięto edit");
  res.render('editFilm_form',{
    id:  editID,
    title: editTitle,
    director: editDirector,
    prod_dt: editPrDt,
    actors: editActors
  });

});
  



//=========================  znajdowanie filmu do edycji na podstawie id w bazie Mongo ========
app.post("/edit1Film",(req, res) => {
  let searchId = req.body.idToEdit;
  let o_id = new ObjectId(searchId);
  let newTitle = req.body.e_title;
  let newDirector= req.body.e_director;
  let newProdYear = req.body.e_prodYear;
  let newActors = req.body.e_act;

  console.log(`Przesłałeś do serwera ${searchId}, ${newTitle}, ${newDirector}, ${newProdYear}, ${newActors}`);
  
  mongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
      if (err) throw err;
      const dbname = 'db_university';
      const db = client.db(dbname);

      const filter = {_id: o_id}; //szukamy id filmu który chcemy zaktualizować
      const update = { $set: {"title": newTitle, "director": newDirector, "prod_date": newProdYear, "actors":
                      newActors} };

      
      db.collection("films").updateMany(filter, update, function(err, res) {
        if (err) throw err;
        console.log("Zaktualizano dane w bazie Mongo dla:");
        console.log(filter);
        client.close();              
      }); 


    });
  res.render('index',{});
});

//=========================  otwarcie formularza usuwania filmu o określonym id  ========

var delID = "";
app.post("/delFilm_enter_form",(req, res) => {
  let delID = req.body.idToDel;
  let delTitle = req.body.titleToDel;
  let delDirector = req.body.directorToDel;
  let delPrDt = req.body.prdtToDel;
  let delActors = req.body.actorsToDel;
  

  console.log("kliknięto delete");
  res.render('delFilm_form',{
    id:  delID,
    title: delTitle,
    director: delDirector,
    prod_dt: delPrDt,
    actors: delActors
  });

});
  







//=================== usuwanie 1 wybranego filmu na podstawie id ============

app.post("/del1Film",(req, res) => {
  let searchId = req.body.idToDel;
  let o_id = new ObjectId(searchId);
  console.log(`Przesłałeś do serwera ${searchId}`);

  mongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
    if (err) throw err;
    const dbname = 'db_university';
    const db = client.db(dbname);

    const filter = {_id: o_id}; //szukamy id filmu który chcemy usunąć
       
    db.collection("films").deleteOne(filter, function(err, res) {
      if (err) throw err;
      console.log("Usunięto 1 dokument");
      client.close();              
    }); 


  });
res.render('find_form',{});



});






//======================================================================================================
//======================================================================================================
//-------test

           


//---- wzór połączenia z Mongo i wsadu typu InsertOne
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("mydb");
//   var myobj = { name: "Company Inc", address: "Highway 37" };
//   dbo.collection("customers").insertOne(myobj, function(err, res) {
//     if (err) throw err;
//     console.log("1 document inserted");
//     db.close();
//   });
// }); 


//--------------------- działający
//obsługa zapytania na endpoint '/outputReservated'
// app.get('/outputReservated',(req,res) => {
//   const dbname = 'db_university';
//    mongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
//           if (err) throw err;
//           const db = client.db(dbname);
//           const filter = {jet: jetInput, free: false};
//           db.collection("seats").find(filter).toArray((error, result) => {
//             if (err) throw err;
            
//             reservedOutput = result; //rezultatem jest tablica 3 obiektów
//             console.log("wyniki odpytania MongoDB ponizej:");
//             console.log(reservedOutput);
//             client.close();
            
//           });
//           console.log("udane połączenie z bazą");
//         });

//     res.send(reservedOutput);
// });





// function checkReservated() {
//   const dbname = 'db_university';
//   const filter = {jet: jetInput, free: false};
//   mongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
//       if (err) throw err;
//       const db = client.db(dbname);
//       const filter = {jet: jetInput, free: false};
//       db.collection("seats").find(filter).toArray((error, result) => {
//         if (err) throw err;
//         reservedOutput = result; //rezultatem jest tablica 3 obiektów
//         console.log("wyniki odpytania MongoDB ponizej:");
//         console.log(reservedOutput);
//         client.close();
//       });
//    console.log("udane połączenie z bazą");
//   });
// };

//------ działający
// app.get('/outputReservated',(req,res) => {
  
//     checkReservated();
//     res.send(reservedOutput);

// });



// app.get('/outputReservated',(req,res) => {
  
//   async function f() {
//     checkReservated();
//   }
//   f()
//   .then(console.log(reservedOutput))
//   .then(
//     res.send(reservedOutput)
//   );
  

// });



//--użycie mongo zwraca promis
// MongoClient.connect(url)
//   .then(function (db) { // <- db as first argument
//     console.log(db)
//   })
//   .catch(function (err) {})



// async function main(){
//   let client, db;
//   try{
//      client = await MongoClient.connect(mongoUrl, {useNewUrlParser: true});
//      db = client.db(dbName);
//      let dCollection = db.collection('collectionName');
//      let result = await dCollection.find();   
//      // let result = await dCollection.countDocuments();
//      // your other codes ....
//      return result.toArray();
//   }
//   catch(err){ console.error(err); } // catch any mongo error here
//   finally{ client.close(); } // make sure to close your connection after
//  }


//--------------- obsługa aktualizacji zarezerwowanych miejsc ---------

app.post('/updateReservated',(req,res) => {
  bookedSeats = req.body;
  console.log('poniżej obiekt w Node pobrany z frontendu');
  console.log(bookedSeats);  

  const dbname = 'db_university';
  mongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
        if (err) throw err;
        const db = client.db(dbname);
        const seatInput = req.body.seat;
        const jetInput = req.body.jet;
        const filter = {seat: seatInput, jet: jetInput}; //szukamy miejsca które chcemy zaktualizować
        const update = { $set: {free: false} };
        db.collection("seats").updateOne(filter, update, function(err, res) {
          if (err) throw err;
          console.log("Zaktualizano dane w bazie Mongo dla:");
          console.log(filter);
          client.close();
        });
        console.log("udane połączenie z bazą");
      });

});




//-------------------------------------------------------------------------------------------------
//----- start serwera Node
app.listen(port, (err) => {
    if (err) {
        return console.log("coś poszło nie tak ...:", err)
    }
    console.log("serwer działa na porcie", port)
});

app.use('/assets', express.static(path.join(__dirname,"./assets")));
app.use('/js', express.static(path.join(__dirname, "./js")));



module.exports = router;
