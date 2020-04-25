//sursa:https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
topButton = document.getElementById("top");

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




let text="<autoturisme>"+
"<linie><judet>ALBA</judet><categorie_nationala>AUTOTURISM</categorie_nationala><categorie_comunitara>M1  </categorie_comunitara><marca>BMW</marca><descriere_comerciala>525DA</descriere_comerciala><total_vehicule>2</total_vehicule></linie>"+
"<linie><judet>ALBA</judet><categorie_nationala>AUTOTURISM</categorie_nationala><categorie_comunitara>M1  </categorie_comunitara><marca>BMW</marca><descriere_comerciala>525I</descriere_comerciala><total_vehicule>9</total_vehicule></linie>"+
"<linie><judet>ALBA</judet><categorie_nationala>AUTOTURISM</categorie_nationala><categorie_comunitara>M1  </categorie_comunitara><marca>BMW</marca><descriere_comerciala>525TD</descriere_comerciala><total_vehicule>2</total_vehicule></linie>"+
"<linie><judet>ALBA</judet><categorie_nationala>AUTOTURISM</categorie_nationala><categorie_comunitara>M1  </categorie_comunitara><marca>BMW</marca><descriere_comerciala>525TDS</descriere_comerciala><total_vehicule>12</total_vehicule></linie>"+
"<linie><judet>ALBA</judet><categorie_nationala>AUTOTURISM</categorie_nationala><categorie_comunitara>M1  </categorie_comunitara><marca>BMW</marca><descriere_comerciala>525XD</descriere_comerciala><total_vehicule>3</total_vehicule></linie>"+
"<linie><judet>ALBA</judet><categorie_nationala>AUTOTURISM</categorie_nationala><categorie_comunitara>M1  </categorie_comunitara><marca>BMW</marca><descriere_comerciala>528 I</descriere_comerciala><total_vehicule>1</total_vehicule></linie>"+
"<linie><judet>ALBA</judet><categorie_nationala>AUTOTURISM</categorie_nationala><categorie_comunitara>M1  </categorie_comunitara><marca>BMW</marca><descriere_comerciala>528I</descriere_comerciala><total_vehicule>4</total_vehicule></linie>"+
"<linie><judet>ALBA</judet><categorie_nationala>AUTOTURISM</categorie_nationala><categorie_comunitara>M1  </categorie_comunitara><marca>BMW</marca><descriere_comerciala>528I XDRIVE</descriere_comerciala><total_vehicule>2</total_vehicule></linie>"+
"<linie><judet>ALBA</judet><categorie_nationala>AUTOTURISM</categorie_nationala><categorie_comunitara>M1  </categorie_comunitara><marca>BMW</marca><descriere_comerciala>530</descriere_comerciala><total_vehicule>4</total_vehicule></linie>"+
"<linie><judet>ALBA</judet><categorie_nationala>AUTOTURISM</categorie_nationala><categorie_comunitara>M1  </categorie_comunitara><marca>BMW</marca><descriere_comerciala>530 D</descriere_comerciala><total_vehicule>32</total_vehicule></linie>"+
"<linie><judet>ALBA</judet><categorie_nationala>AUTOTURISM</categorie_nationala><categorie_comunitara>M1  </categorie_comunitara><marca>BMW</marca><descriere_comerciala>530 I</descriere_comerciala><total_vehicule>2</total_vehicule></linie>"+
"<linie><judet>ALBA</judet><categorie_nationala>AUTOTURISM</categorie_nationala><categorie_comunitara>M1  </categorie_comunitara><marca>BMW</marca><descriere_comerciala>530D</descriere_comerciala><total_vehicule>38</total_vehicule></linie>"+
"<linie><judet>ALBA</judet><categorie_nationala>AUTOTURISM</categorie_nationala><categorie_comunitara>M1  </categorie_comunitara><marca>BMW</marca><descriere_comerciala>530D XDRIVE</descriere_comerciala><total_vehicule>13</total_vehicule></linie>"+
"<linie><judet>ALBA</judet><categorie_nationala>AUTOTURISM</categorie_nationala><categorie_comunitara>M1  </categorie_comunitara><marca>BMW</marca><descriere_comerciala>530D XDRIVE TOURING</descriere_comerciala><total_vehicule>1</total_vehicule></linie>"+
"<linie><judet>ALBA</judet><categorie_nationala>AUTOTURISM</categorie_nationala><categorie_comunitara>M1  </categorie_comunitara><marca>BMW</marca><descriere_comerciala>530DA</descriere_comerciala><total_vehicule>2</total_vehicule></linie>"+
"<linie><judet>ALBA</judet><categorie_nationala>AUTOTURISM</categorie_nationala><categorie_comunitara>M1  </categorie_comunitara><marca>BMW</marca><descriere_comerciala>530I</descriere_comerciala><total_vehicule>2</total_vehicule></linie>"+
"<linie><judet>ALBA</judet><categorie_nationala>AUTOTURISM</categorie_nationala><categorie_comunitara>M1  </categorie_comunitara><marca>BMW</marca><descriere_comerciala>530XD</descriere_comerciala><total_vehicule>16</total_vehicule></linie>"+
"<linie><judet>ALBA</judet><categorie_nationala>AUTOTURISM</categorie_nationala><categorie_comunitara>M1  </categorie_comunitara><marca>BMW</marca><descriere_comerciala>530XI</descriere_comerciala><total_vehicule>2</total_vehicule></linie>"+
"<linie><judet>ALBA</judet><categorie_nationala>AUTOTURISM</categorie_nationala><categorie_comunitara>M1  </categorie_comunitara><marca>BMW</marca><descriere_comerciala>535 D</descriere_comerciala><total_vehicule>9</total_vehicule></linie>"+
"<linie><judet>ALBA</judet><categorie_nationala>AUTOTURISM</categorie_nationala><categorie_comunitara>M1  </categorie_comunitara><marca>BMW</marca><descriere_comerciala>535 D GRAN TURISMO</descriere_comerciala><total_vehicule>1</total_vehicule></linie>"+
"<linie><judet>ALBA</judet><categorie_nationala>AUTOTURISM</categorie_nationala><categorie_comunitara>M1  </categorie_comunitara><marca>BMW</marca><descriere_comerciala>535D</descriere_comerciala><total_vehicule>8</total_vehicule></linie>"+
"<linie><judet>ALBA</judet><categorie_nationala>AUTOTURISM</categorie_nationala><categorie_comunitara>M1  </categorie_comunitara><marca>BMW</marca><descriere_comerciala>535D XDRIVE</descriere_comerciala><total_vehicule>6</total_vehicule></linie>"+
"<linie><judet>ALBA</judet><categorie_nationala>AUTOTURISM</categorie_nationala><categorie_comunitara>M1  </categorie_comunitara><marca>BMW</marca><descriere_comerciala>535I</descriere_comerciala><total_vehicule>3</total_vehicule></linie>"+
"<linie><judet>ALBA</judet><categorie_nationala>AUTOTURISM</categorie_nationala><categorie_comunitara>M1  </categorie_comunitara><marca>BMW</marca><descriere_comerciala>535I GRAN TURISMO</descriere_comerciala><total_vehicule>1</total_vehicule></linie>"+
"<linie><judet>ALBA</judet><categorie_nationala>AUTOTURISM</categorie_nationala><categorie_comunitara>M1  </categorie_comunitara><marca>BMW</marca><descriere_comerciala>5ER</descriere_comerciala><total_vehicule>2</total_vehicule></linie>"+
"<linie><judet>ALBA</judet><categorie_nationala>AUTOTURISM</categorie_nationala><categorie_comunitara>M1  </categorie_comunitara><marca>BMW</marca><descriere_comerciala>5ER REIHE (520D)</descriere_comerciala><total_vehicule>3</total_vehicule></linie>"+
"<linie><judet>ALBA</judet><categorie_nationala>AUTOTURISM</categorie_nationala><categorie_comunitara>M1  </categorie_comunitara><marca>BMW</marca><descriere_comerciala>630I</descriere_comerciala><total_vehicule>1</total_vehicule></linie>"+
"<linie><judet>ALBA</judet><categorie_nationala>AUTOTURISM</categorie_nationala><categorie_comunitara>M1  </categorie_comunitara><marca>BMW</marca><descriere_comerciala>635D</descriere_comerciala><total_vehicule>2</total_vehicule></linie>"+
"<linie><judet>ALBA</judet><categorie_nationala>AUTOTURISM</categorie_nationala><categorie_comunitara>M1  </categorie_comunitara><marca>BMW</marca><descriere_comerciala>640D</descriere_comerciala><total_vehicule>3</total_vehicule></linie>"+
"<linie><judet>ALBA</judet><categorie_nationala>AUTOTURISM</categorie_nationala><categorie_comunitara>M1  </categorie_comunitara><marca>BMW</marca><descriere_comerciala>640D XDRIVE</descriere_comerciala><total_vehicule>3</total_vehicule></linie>"+
"<linie><judet>ALBA</judet><categorie_nationala>AUTOTURISM</categorie_nationala><categorie_comunitara>M1  </categorie_comunitara><marca>BMW</marca><descriere_comerciala>645 CI</descriere_comerciala><total_vehicule>1</total_vehicule></linie>"+
"<linie><judet>ALBA</judet><categorie_nationala>AUTOTURISM</categorie_nationala><categorie_comunitara>M1  </categorie_comunitara><marca>BMW</marca><descriere_comerciala>724</descriere_comerciala><total_vehicule>1</total_vehicule></linie>"+
"<linie><judet>ALBA</judet><categorie_nationala>AUTOTURISM</categorie_nationala><categorie_comunitara>M1  </categorie_comunitara><marca>BMW</marca><descriere_comerciala>724 TD</descriere_comerciala><total_vehicule>1</total_vehicule></linie>"+
"<linie><judet>ALBA</judet><categorie_nationala>AUTOTURISM</categorie_nationala><categorie_comunitara>M1  </categorie_comunitara><marca>BMW</marca><descriere_comerciala>725</descriere_comerciala><total_vehicule>2</total_vehicule></linie>"+
"<linie><judet>ALBA</judet><categorie_nationala>AUTOTURISM</categorie_nationala><categorie_comunitara>M1  </categorie_comunitara><marca>BMW</marca><descriere_comerciala>725 TDS</descriere_comerciala><total_vehicule>6</total_vehicule></linie>"+
"<linie><judet>ALBA</judet><categorie_nationala>AUTOTURISM</categorie_nationala><categorie_comunitara>M1  </categorie_comunitara><marca>BMW</marca><descriere_comerciala>725TDS</descriere_comerciala><total_vehicule>2</total_vehicule></linie>"+
"<linie><judet>ALBA</judet><categorie_nationala>AUTOTURISM</categorie_nationala><categorie_comunitara>M1  </categorie_comunitara><marca>BMW</marca><descriere_comerciala>728I</descriere_comerciala><total_vehicule>1</total_vehicule></linie>"+
"<linie><judet>ALBA</judet><categorie_nationala>AUTOTURISM</categorie_nationala><categorie_comunitara>M1  </categorie_comunitara><marca>BMW</marca><descriere_comerciala>730</descriere_comerciala><total_vehicule>2</total_vehicule></linie>"+
"<linie><judet>ALBA</judet><categorie_nationala>AUTOTURISM</categorie_nationala><categorie_comunitara>M1  </categorie_comunitara><marca>BMW</marca><descriere_comerciala>730 D</descriere_comerciala><total_vehicule>14</total_vehicule></linie>"+
"<linie><judet>ALBA</judet><categorie_nationala>AUTOTURISM</categorie_nationala><categorie_comunitara>M1  </categorie_comunitara><marca>BMW</marca><descriere_comerciala>730 LD</descriere_comerciala><total_vehicule>1</total_vehicule></linie>"+
"<linie><judet>ALBA</judet><categorie_nationala>AUTOTURISM</categorie_nationala><categorie_comunitara>M1  </categorie_comunitara><marca>BMW</marca><descriere_comerciala>730D</descriere_comerciala><total_vehicule>39</total_vehicule></linie>"+
"</autoturisme>";


function dark() {
   var element = document.body;
   element.classList.toggle("dark-mode");
   
}
		