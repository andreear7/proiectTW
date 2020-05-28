

//sursa:https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
var topButton = document.getElementById("top");

// When the user scrolls down 150px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
	
  if ( document.documentElement.scrollTop > 150) {
    topButton.style.display = "block";
  } else {
    topButton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.documentElement.scrollTop = 0; 
}
//geolocation api w3s
var x = document.getElementById("locatie");
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  //x.innerHTML = "Latitude: " + position.coords.latitude +
  //"<br>Longitude: " + position.coords.longitude;
  alert("am gasit locatia")
}

function noData()
{ 

   let table = document.querySelector("table");
   table.innerHTML="Ne pare rau,nu au fost gasite rezultate conform cautarilor dumneavoastra."
  //  let image=document.getElementById("sad")
  var image=document.createElement("img")
image.id="sad"
   image.src='./sad.jpg'
   document.body.appendChild(image)
   var loader=document.getElementById("loader")
  document.body.removeChild(loader)
}


//sursa:https://www.valentinog.com/blog/html-table/




// let tableData = Object.keys(autoturisme[0]);
// window.onload = loadTable(tableData,autoturisme);

function generateTableHead(table, data) {
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key of data) {
    let th = document.createElement("th");
    let text = document.createTextNode(key.toUpperCase());
    //text = text.toUpperCase();
    th.appendChild(text);
    row.appendChild(th);
  }
}

function generateTable(table, data) {
  for (let element of data) {
    let row = table.insertRow();
    for (let key in element) {
      let cell = row.insertCell();
      let text = document.createTextNode(element[key]);
      cell.appendChild(text);
    }
  }
}

 function loadTable(head,data)
{
let table = document.querySelector("table");

generateTableHead(table, head);
generateTable(table,data );
var loader=document.getElementById("loader")
  document.body.removeChild(loader)

}
function makeGetForTable()
{ var info;
  let image=document.getElementById("sad")
  if(image)
  document.body.removeChild(image)
  let table = document.querySelector("table");
table.innerHTML=null;
  var loader=document.createElement("div")
  loader.id="loader"
  document.body.appendChild(loader)
//   window.showDiv = function() {
//   var loader=document.getElementById("loader")
//   loader.setAttribute("display","inline-block") }
//  console.log("disp", loader.getAttribute("display"))
var judet=document.getElementById("judet").value;
var marca=document.getElementById("marca").value;
var categorie=document.getElementById("categorie").value;
var an=document.getElementById("an").value;
var theUrl="/info/?judet="+judet+"&marca="+marca+"&categorie="+categorie+"&an="+an;
// fetch(theUrl).then(function (response) {
//    // The API call was successful!
//    console.log(response)
//    if(response.status==204)
//    return JSON.stringify(response.blob());
//    else
// 	return response.json();
// // }).then(function (data) {
// //    console.log("dataaaaa "+data)
// //    if(!data)
// //    return JSON.stringify(data);
// //    else
// //    return data;
// }).then(function ( info)
// {
//    console.log("info"+info)
//    if(info=='{}')
//     {
// noData();
// document.getElementById("desc-table").innerHTML=null;
//     }
//     else
//     { document.getElementById("desc-table").innerHTML=null;
//    // info=JSON.parse(info)
// image=document.getElementById("sad")
// image.src=null;
// let infos = Object.keys(info[0]);
// // console.log(infos)
// let table = document.querySelector("table");
// table.innerHTML=null;
// loadTable(infos,info)} 
 
	
// }).catch(function (err) {
	
// 	console.warn('Something went wrong.', err);
// });


if (window.XMLHttpRequest) {
  
    var xmlHttp = new XMLHttpRequest(); 
    
    xmlHttp.open( "GET", theUrl, true ); 
    xmlHttp.send();
   //  data=xmlHttp.responseText;
   //  alert(xmlHttp.status+"cd"+xmlHttp.readyState)
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState==4 && xmlHttp.status==200)
{  info=this.responseText
//    console.log("inf"+info);
//     if(info=="[]")
//     {
// noData();
// document.getElementById("desc-table").innerHTML=null;
//     }
//     else
//     { 
      // document.getElementById("desc-table").innerHTML=null;
   info=JSON.parse(this.responseText)

let infos = Object.keys(info[0]);
// console.log(infos)
let table = document.querySelector("table");
table.innerHTML=null;
loadTable(infos,info)}
else
{
  if (xmlHttp.readyState==4 && xmlHttp.status==204)
  {
    noData();
  }

} }

    }
     
}



document.addEventListener('DOMContentLoaded', () => {

  const themeStylesheet = document.getElementById('theme');
  const storedTheme = localStorage.getItem('theme');
  if(storedTheme){
      themeStylesheet.href = storedTheme;
  }
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', () => {
      // if it's light -> go dark
      if(themeStylesheet.href.includes('exs')){
        themeStylesheet.href = 'dark.css';
      //   themeToggle.innerText = 'Switch to light mode';
    } else {
        // if it's dark -> go light
        themeStylesheet.href = 'exs.css';
      //   themeToggle.innerText = 'Switch to dark mode';

    }
      // save the preference to localStorage
      localStorage.setItem('theme',themeStylesheet.href)  
  })
})


