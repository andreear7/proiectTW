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




//sursa:https://www.valentinog.com/blog/html-table/


let autoturisme=[
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "525DA",
     "total_vehicule": "2"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "525I",
     "total_vehicule": "9"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "525TD",
     "total_vehicule": "2"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "525TDS",
     "total_vehicule": "12"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "525XD",
     "total_vehicule": "3"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "528 I",
     "total_vehicule": "1"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "528I",
     "total_vehicule": "4"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "528I XDRIVE",
     "total_vehicule": "2"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "530",
     "total_vehicule": "4"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "530 D",
     "total_vehicule": "32"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "530 I",
     "total_vehicule": "2"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "530D",
     "total_vehicule": "38"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "530D XDRIVE",
     "total_vehicule": "13"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "530D XDRIVE TOURING",
     "total_vehicule": "1"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "530DA",
     "total_vehicule": "2"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "530I",
     "total_vehicule": "2"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "530XD",
     "total_vehicule": "16"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "530XI",
     "total_vehicule": "2"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "535 D",
     "total_vehicule": "9"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "535 D GRAN TURISMO",
     "total_vehicule": "1"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "535D",
     "total_vehicule": "8"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "535D XDRIVE",
     "total_vehicule": "6"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "535I",
     "total_vehicule": "3"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "535I GRAN TURISMO",
     "total_vehicule": "1"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "5ER",
     "total_vehicule": "2"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "5ER REIHE (520D)",
     "total_vehicule": "3"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "630I",
     "total_vehicule": "1"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "635D",
     "total_vehicule": "2"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "640D",
     "total_vehicule": "3"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "640D XDRIVE",
     "total_vehicule": "3"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "645 CI",
     "total_vehicule": "1"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "724",
     "total_vehicule": "1"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "724 TD",
     "total_vehicule": "1"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "725",
     "total_vehicule": "2"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "725 TDS",
     "total_vehicule": "6"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "725TDS",
     "total_vehicule": "2"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "728I",
     "total_vehicule": "1"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "730",
     "total_vehicule": "2"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "730 D",
     "total_vehicule": "14"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "730 LD",
     "total_vehicule": "1"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "730D",
     "total_vehicule": "39"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "730D XDRIVE",
     "total_vehicule": "4"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "730DA",
     "total_vehicule": "3"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "730DXDRIVE",
     "total_vehicule": "1"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "730IA",
     "total_vehicule": "2"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "730LD",
     "total_vehicule": "2"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "730LD XDRIVE",
     "total_vehicule": "1"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "735I",
     "total_vehicule": "3"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "740",
     "total_vehicule": "1"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "740 D X DRIVE",
     "total_vehicule": "3"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "740D",
     "total_vehicule": "6"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "740D XDRIVE",
     "total_vehicule": "11"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "740IA",
     "total_vehicule": "1"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "740LD XDRIVE",
     "total_vehicule": "1"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "745D",
     "total_vehicule": "2"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "750D XDRIVE",
     "total_vehicule": "2"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "750LD XDRIVE",
     "total_vehicule": "2"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "760 LI",
     "total_vehicule": "1"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "BMW 118D",
     "total_vehicule": "5"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "BMW116",
     "total_vehicule": "1"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "GRAN TURISMO",
     "total_vehicule": "4"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "M 550D XDRIVE",
     "total_vehicule": "1"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "M3",
     "total_vehicule": "1"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "M5",
     "total_vehicule": "1"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "M5 COMPETITION",
     "total_vehicule": "1"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "X DRIVE 23D",
     "total_vehicule": "8"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "X REIHE",
     "total_vehicule": "2"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "X1",
     "total_vehicule": "20"
  },
  {
     "judet": "ALBA",
     "categorie_nationala": "AUTOTURISM",
     "categorie_comunitara": "M1",
     "marca": "BMW",
     "descriere_comerciala": "X1 SDRIVE 1.8I",
     "total_vehicule": "1"
  }
]

let tableData = Object.keys(autoturisme[0]);
window.onload = loadTable(tableData,autoturisme);

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

}
function makeGetForTable()
{
var judet=document.getElementById("judet").value;
var marca=document.getElementById("marca").value;
var categorie=document.getElementById("categorie").value;
var an=document.getElementById("an").value;
if (window.XMLHttpRequest) {
  
    var xmlHttp = new XMLHttpRequest(); 
    var theUrl="/info/?judet="+judet+"&marca="+marca+"&categorie="+categorie+"&an="+an;
    xmlHttp.open( "GET", theUrl, true ); 
    xmlHttp.send();
   //  data=xmlHttp.responseText;
   //  alert(xmlHttp.status+"cd"+xmlHttp.readyState)
    xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState==4 && xmlHttp.status==200)
{info=JSON.parse(this.responseText)
   console.log(info)
let infos = Object.keys(info[0]);
console.log(infos)
let table = document.querySelector("table");
table.innerHTML=null;
loadTable(infos,info)}

    }
     
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


