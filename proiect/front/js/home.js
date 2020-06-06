//https://www.w3schools.com/w3css/tryit.asp?filename=tryw3css_slideshow_rr

var myIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("slides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  myIndex++;
  if (myIndex > x.length) {myIndex = 1}    
  x[myIndex-1].style.display = "block";  
  setTimeout(carousel, 2000); 
}
document.addEventListener('DOMContentLoaded', () => {

  const themeStylesheet = document.getElementById('theme');
  const storedTheme = localStorage.getItem('theme');
  if(storedTheme){
      themeStylesheet.href = storedTheme;
  }
  const themeToggle = document.getElementById('theme-toggle');
  themeToggle.addEventListener('click', () => {
    
      if(themeStylesheet.href.includes('light')){
        themeStylesheet.href = './css/dark.css';
    } else {
        themeStylesheet.href = './css/light.css';
    }
      localStorage.setItem('theme',themeStylesheet.href)  
  })
})