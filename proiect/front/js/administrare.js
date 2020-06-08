function checkPswd() {

    var password = document.getElementById("pswd").value;
    if (password) {
        var theUrl = "/administrare/?name=admin&password=" + password;

        if (window.XMLHttpRequest) {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("GET", theUrl, true);
            xmlHttp.send();

            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {

                    var form=document.getElementById("form");
                    form.innerHTML = "Bine ai venit!";
                    form.style.fontSize="35px";
                    form.style.color= "#0099CC";
                    form.style.padding="12px 24px";
                    form.style.textAlign="center";

                   
                    document.getElementById("tip").innerHTML = "Alege tipul operatiei intai!"

                } else {
                    if (xmlHttp.readyState == 4 && xmlHttp.status == 204) {
                        alert("Parola gresita!");
                    }
                }
            }
        }
    }


}

function introduInregistrare() {
    if (document.getElementById("form").innerHTML == "Bine ai venit!")
        document.getElementById("tip").innerHTML = "Introdu jsonul corespunzator inregistrarii pe care vrei sa o introduci";

}

function stergeInregistrare() {
    if (document.getElementById("form").innerHTML == "Bine ai venit!")
        document.getElementById("tip").innerHTML = "Introdu id-ul corespunzator inregistrarii pe care vrei sa o stergi"
}

function modificaInregistrare() {
    if (document.getElementById("form").innerHTML == "Bine ai venit!")
        document.getElementById("tip").innerHTML = "Introdu jsonul corespunzator inregistrarii pe care vrei sa o modifici"
}

function makeOperation() {
    var tip = document.getElementById("tip").innerHTML;
    if (tip.includes("introduci")) {
        var json = document.getElementById("continut").value;
        console.log(json)
        json = JSON.parse(json);
        var judet = json.JUDET;
        var an = json.AN;
        var categorieN = json.CATEGORIE_NATIONALA;
        var categorieC = json.CATEGORIE_COMUNITARA;
        var descriere = json.DESCRIERE_COMERCIALA;
        var marca = json.MARCA;
        var total = json.TOTAL_VEHICULE;


        var theUrl = "/administrare/?operatie=insert&judet=" + judet + "&an=" + an + "&categorieN=" + categorieN +
            "&categorieC=" + categorieC + "&descriere=" + descriere + "&marca=" + marca + "&total=" + total;

        if (window.XMLHttpRequest) {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("POST", theUrl, true);
            xmlHttp.send();
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 201) {
                    raspuns = this.responseText
                    document.getElementById("raspuns").style.backgroundColor = "palegreen";
                    document.getElementById("raspuns").innerHTML = raspuns;
                } else {
                    if (xmlHttp.readyState == 4 && xmlHttp.status == 500) {
                        raspuns = this.responseText;
                        document.getElementById("raspuns").style.backgroundColor = "tomato";
                        document.getElementById("raspuns").innerHTML = raspuns;
                    }
                }
            }
        }

    }

    if (tip.includes("modifici")) {
        var json = document.getElementById("continut").value;
        console.log(json)
        json = JSON.parse(json);
        var id = json.ID;
        var judet = json.JUDET;
        var an = json.AN;
        var categorieN = json.CATEGORIE_NATIONALA;
        var categorieC = json.CATEGORIE_COMUNITARA;
        var descriere = json.DESCRIERE_COMERCIALA;
        var marca = json.MARCA;
        var total = json.TOTAL_VEHICULE;

        var theUrl = "/administrare/?operatie=update&id=" + id + "&judet=" + judet + "&an=" + an + "&categorieN=" + categorieN +
            "&categorieC=" + categorieC + "&descriere=" + descriere + "&marca=" + marca + "&total=" + total;

        if (window.XMLHttpRequest) {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("PUT", theUrl, true);
            xmlHttp.send();
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    raspuns = this.responseText
                    document.getElementById("raspuns").style.backgroundColor = "palegreen";
                    document.getElementById("raspuns").innerHTML = raspuns;
                } else {
                    if (xmlHttp.readyState == 4 && xmlHttp.status == 500) {
                        raspuns = this.responseText;
                        document.getElementById("raspuns").style.backgroundColor = "tomato";
                        document.getElementById("raspuns").innerHTML = raspuns;
                    }
                }
            }
        }
    }

    if (tip.includes("stergi")) {
        var json = document.getElementById("continut").value;
        console.log(json)
        json = JSON.parse(json);
        var idd = json.ID;
        var an = json.AN;

        console.log(idd)

        var theUrl = "/administrare/?operatie=delete&id=" + idd + "&an=" + an;

        if (window.XMLHttpRequest) {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("DELETE", theUrl, true);
            xmlHttp.send();
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    raspuns = this.responseText
                    document.getElementById("raspuns").style.backgroundColor = "palegreen";
                    document.getElementById("raspuns").innerHTML = raspuns;
                } else {
                    if (xmlHttp.readyState == 4 && xmlHttp.status == 500) {
                        raspuns = this.responseText;
                        document.getElementById("raspuns").style.backgroundColor = "tomato";
                        document.getElementById("raspuns").innerHTML = raspuns;
                    }
                }
            }
        }


    }
}

