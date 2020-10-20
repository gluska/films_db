 //----------------- rejestracja nowego filmu w bazie
//nasłuch buttona - przekierowanie do formularza rejestracji nowego filmu
const btn_reg = document.getElementById('add-btn');
btn_reg.addEventListener('click', () => {location.href='/register';}); 

 //----------------- wyszukiwarka filmów w bazie
//nasłuch buttona - przekierowanie do formularza wyszukiwarki
const btn_find = document.getElementById('find-btn');
btn_find.addEventListener('click', () => {location.href='/find';}); 









// //-------------------------------------------step1:  przekazanie danych samolotu do sprawdzenia-------------------------------------
// const jetName = { jet: "Bom" };//dane testowe
// const but_test1 = document.getElementById('test1-btn');

// //post do endpointu '/checkJet' - przekazanie nazwy wybranego samolotu z front-end do back-end (server)
// async function sendJetName(){fetch('/checkJet', {
//   method: 'post',
//   body: JSON.stringify(jetName),
// 	headers: {'Content-Type': 'application/json'}
// 	})
// 	.then(res => res.json())
//   .then(json => console.log(`tekst z index.js ${json}`));
// };

// //nasłuch buttona - 
// but_test1.addEventListener('click', sendJetName);  //wyślij nazwę samolotu z FrontEndu do BackEndu

// // -------------------step 2:   odpytanie o zarezerwowane miejsca w samlocie 
// //----------------------------- który w pierwszym kroku przekazaliśmy (poprzez kliknięcie)
// var outputResponse = {};
// function checkReservedSeats(){
//   fetch('/outputReservated',{metod: 'GET'})
//   .then((response) => response.json()) //transform the data into json
//   .then(function(data){
//     console.log(data); //tablica objektów [{},{},{}]
//     //console.log(data[0]); //pierwszy objekt z tablicy objektów
//     //console.log(data[0].seat); //konkretny klucz z pierwszego obiektu
//     document.getElementById('output_BE').innerHTML  = ''; //reset
//     data.forEach(function(element){
//         document.getElementById('output_BE').innerHTML +=`<div>${element.seat}</div>`; //zrzut miejsca na ekran, zrobią się subdivy
//       });
   
//   })
//   .catch(function(error){
//         console.log(error);
//       })
//   };


// //nasłuch buttona - sprawdzenie zarezerwowanych miejsc
// const but_test10 = document.getElementById('test10-btn');
// but_test10.addEventListener('click', checkReservedSeats);  

// //----------------- rejestracja użytkownika
// //nasłuch buttona - przekierowanie do formularza rejestracji użytkownika
// const but_reg = document.getElementById('reg-btn');
// but_reg.addEventListener('click', () => {

//   location.href='/register';
// });  

// //nasłuch buttona - rejestracja użytkownika - przekazanie do serwera
// document.getElementById('btn2').addEventListener('click', () => {
// let loginInput = document.getElementById('inputLogin').value;
// console.log(loginInput);


// });


// //---------------------aktualizacja zarezerwowanych miejsc-------------------------------------------------------------
// const bodySeats = { seat: "A03", jet: "Bom" };//dane testowe
// const but_test2 = document.getElementById('test11-btn');

// async function testPostSeat(){
//   fetch('/updateReservated', {
//     method: 'post', //przekazujemy do serwera dane miejsca które chcemy odznaczyć jako zarezerwowane
//     body: JSON.stringify(bodySeats),
//     headers: {'Content-Type': 'application/json'}
//   })
//  .then(res => res.json())
//  .then(json => console.log(json));
// };

// //nasłuch buttona
// but_test2.addEventListener('click', testPostSeat); 




