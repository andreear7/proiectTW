function makePostForComment() {
    var raspuns;
    var email = document.getElementById("email").value;
    var nume = document.getElementById("nume").value;
    var comentariu = document.getElementById("comentariu").value;

    var theUrl = "/contact/?email=" + email + "&nume=" + nume + "&comentariu=" + comentariu;

    if (window.XMLHttpRequest) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("POST", theUrl, true);
        xmlHttp.send();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 201) {
                raspuns = this.responseText
                  document.getElementById("raspuns").style.backgroundColor="green"
                document.getElementById("raspuns").innerHTML=raspuns;
            } else {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 400) {
                     raspuns = this.responseText;
                     document.getElementById("raspuns").style.backgroundColor="red"
                    document.getElementById("raspuns").innerHTML=raspuns;                   
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
