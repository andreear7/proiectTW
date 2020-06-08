//sursa:https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
var topButton = document.getElementById("top");
window.onscroll = function () {
    scrollFunction()
};

function myMove() {
    var elem = document.getElementById("filtreaza");   
    var pos = 0;
    var id = setInterval(frame, 5);
    function frame() {
      if (pos == 300) {
        clearInterval(id);
      } else {
        pos++; 
        elem.style.top = pos + "px"; 
      
      }
    }
  }
function scrollFunction() {
    if (document.documentElement.scrollTop > 150) {
        topButton.style.display = "block";
    } else {
        topButton.style.display = "none";
    }
}

function topFunction() {
    document.documentElement.scrollTop = 0;
}

function noData() {

    let table = document.querySelector("table");
    table.innerHTML = "Ne pare rău, nu au fost găsite rezultate conform căutarilor dumneavoastră!"
    var image = document.createElement("img")
    image.id = "sad"
    image.src = './photos/sad.jpg'
    document.body.appendChild(image)
    var loader = document.getElementById("loader")
    document.body.removeChild(loader)
}


//sursa:https://www.valentinog.com/blog/html-table/

function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key.toUpperCase());
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

function loadTable(head, data) {
    let table = document.querySelector("table");

    generateTableHead(table, head);
    generateTable(table, data);
    var loader = document.getElementById("loader")
    document.body.removeChild(loader)

}

function makeGetForTable() {
    // document.getElementById("formdivs").style.top="100px";
    var info;
    let image = document.getElementById("sad")
    if (image)
        document.body.removeChild(image)
    let table = document.querySelector("table");
    table.innerHTML = null;
    var loader = document.createElement("div")
    loader.id = "loader"
    document.body.appendChild(loader)
    var judet = document.getElementById("judet").value;
    var marca = document.getElementById("marca").value;
    var categorie = document.getElementById("categorie").value;
    var an = document.getElementById("an").value;
    var theUrl = "/info/?judet=" + judet + "&marca=" + marca + "&categorie=" + categorie + "&an=" + an;

    if (window.XMLHttpRequest) {

        var xmlHttp = new XMLHttpRequest();

        xmlHttp.open("GET", theUrl, true);
        xmlHttp.send();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                info = this.responseText
                info = JSON.parse(this.responseText)
                let infos = Object.keys(info[0]);
                let table = document.querySelector("table");
                table.innerHTML = null;
                loadTable(infos, info)
            } else {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 204) {
                    noData();
                }
            }
        }
    }

}
document.addEventListener('DOMContentLoaded', () => {

    const themeStylesheet = document.getElementById('theme');
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
        themeStylesheet.href = storedTheme;
    }
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {

        if (themeStylesheet.href.includes('light')) {
            themeStylesheet.href = './css/dark.css';
        } else {

            themeStylesheet.href = './css/light.css';
        }
        localStorage.setItem('theme', themeStylesheet.href)
    })
})