function checkPswd() {
    var confirmPassword = "admin!";
    var password = document.getElementById("pswd").value;
    if (password == confirmPassword) {
        window.location="http://127.0.0.1:1337/administrare";
        }
    
    else{
        alert("Parola gresita!");
    }

}
function introduInregistrare()
{

document.getElementById("tip").innerHTML="Introdu jsonul corespunzator inregistrarii pe care vrei sa o introduci"

}
function stergeInregistrare()
{
  document.getElementById("tip").innerHTML="Introdu id-ul corespunzator inregistrarii pe care vrei sa o stergi"  
}
function modificaInregistrare()
{
    document.getElementById("tip").innerHTML="Introdu jsonul corespunzator inregistrarii pe care vrei sa o modifici" 
}
function makeOperation()
{
    var tip=document.getElementById("tip").innerHTML;
    if(tip.includes("introduci"))
    {
        var json=document.getElementById("continut").value;
        console.log(json)
        json=JSON.parse(json);
        var judet = json.JUDET;
        var an=json.AN;
        var categorieN=json.CATEGORIE_NATIONALA;
        var categorieC=json.CATEGORIE_COMUNITARA;
        var descriere=json.DESCRIERE_COMERCIALA;
        var marca=json.MARCA;
        console.log(marca,an,judet)
    
        var theUrl = "/administrare/?operatie=insert&judet=" + judet + "&an=" + an + "&categorieN=" + categorieN+
        "&categorieC=" + categorieC + "&descriere=" + descriere + "&marca=" + marca;
    
        if (window.XMLHttpRequest) {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("POST", theUrl, true);
            xmlHttp.send();
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 201) {
                    raspuns = this.responseText
                    document.getElementById("raspuns").style.backgroundColor="green";
                    document.getElementById("raspuns").innerHTML=raspuns;
                } else {
                    if (xmlHttp.readyState == 4 && xmlHttp.status == 500) {
                         raspuns = this.responseText;
                         document.getElementById("raspuns").style.backgroundColor="red";
                        document.getElementById("raspuns").innerHTML=raspuns;                
                    }
                }
            }
        }
    
    }

        if(tip.includes("modifici"))
    {
        var json=document.getElementById("continut").value;
        console.log(json)
        json=JSON.parse(json);
        var judet = json.JUDET;
        var an=json.AN;
        var categorieN=json.CATEGORIE_NATIONALA;
        var categorieC=json.CATEGORIE_COMUNITARA;
        var descriere=json.DESCRIERE_COMERCIALA;
        var marca=json.MARCA;
        console.log(marca,an,judet)
    
        var theUrl = "/administrare/?operatie=update&judet=" + judet + "&an=" + an + "&categorieN=" + categorieN+
        "&categorieC=" + categorieC + "&descriere=" + descriere + "&marca=" + marca;
    
        if (window.XMLHttpRequest) {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("POST", theUrl, true);
            xmlHttp.send();
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 201) {
                    raspuns = this.responseText
                    document.getElementById("raspuns").style.backgroundColor="green";
                    document.getElementById("raspuns").innerHTML=raspuns;
                } else {
                    if (xmlHttp.readyState == 4 && xmlHttp.status == 500) {
                         raspuns = this.responseText;
                         document.getElementById("raspuns").style.backgroundColor="red";
                        document.getElementById("raspuns").innerHTML=raspuns;                
                    }
                }
            }
        }
    }
    
    if(tip.includes("stergi"))
    {
        var json=document.getElementById("continut").value;
        console.log(json)
        json=JSON.parse(json);
        var idd = json.ID;
        var an=json.AN;
        
        console.log(idd)
    
        var theUrl = "/administrare/?operatie=delete&id=" + idd + "&an=" + an;
    
        if (window.XMLHttpRequest) {
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open("POST", theUrl, true);
            xmlHttp.send();
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    raspuns = this.responseText
                    document.getElementById("raspuns").style.backgroundColor="green";
                    document.getElementById("raspuns").innerHTML=raspuns;
                } else {
                    if (xmlHttp.readyState == 4 && xmlHttp.status == 500) {
                         raspuns = this.responseText;
                         document.getElementById("raspuns").style.backgroundColor="red";
                        document.getElementById("raspuns").innerHTML=raspuns;                
                    }
                }
            }
        }



    }
}

