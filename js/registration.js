//----------------- rejestracja dodatkowego filmu
var registerData = {};
var titleInput = "";
var directorInput = "";
var prodYearInput = "";



async function postDataToServer(){
    
    titleInput = await document.getElementById('r_title').value;
    directorInput = await document.getElementById('r_director').value;
    prodYearInput = await document.getElementById('prodYear').value;
    console.log(titleInput);
    console.log(directorInput);
    console.log(prodYearInput);

    registerData = await { 
    title: titleInput, 
    director: directorInput,
    prod_date: prodYearInput
    };//dane testowe
   
    
    
    //console.log(registerData.title);
    //postDataToServerExec();
   fetch('/regToServer', {
        method: 'post', //przekazujemy do serwera dane filmu
        body: JSON.stringify(registerData),
        headers: {'Content-Type': 'application/json'}
    })
    .then(location.href = "/")

    .then(()=>{
        console.log(`Pomyślnie przekazano do bazy: ${titleInput}, ${directorInput}, ${prodYearInput}`);
        
    })
    .then(res => res.json())
    .then(json => console.log(json));

    
};


//nasłuch buttona
// const btn_register = document.getElementById('btnReg');
// btn_register.addEventListener('click', postDataToServer); 