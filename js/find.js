

 console.log(`to jest zmienna przejęta z Node.js do javascriptu: ${name}`);
 var resultFromNodeArr = tblFromNode.split(","); // zamiana tekstu na tablicę
 console.log(resultFromNodeArr);
 var titlesArrFromNodeJS = titlesArrFromNode.split(",");// zamiana tekstu na tablicę
 console.log(titlesArrFromNodeJS);

 if(titlesArrFromNodeJS.includes("Lucy")){
     console.log("zawiera Lucy");
    document.getElementById("table_head").classList.add("active");
    //document.querySelector("table_head").classList.add("active");
   
 };
 
 //========  inna wersja  ========
//  //wybieramy wszystkie buttony służącego do edycji
// const btns = document.getElementsByClassName("editbtn");

// //do każdego wybranego buttona podpinamy nasłuch zdarzeń click
// for (var i = 0 ; i < btns.length; i++) {
//     btns[i].addEventListener('click' , function() {
//         location.href='/edit1Film';
//      }); 
//  }


