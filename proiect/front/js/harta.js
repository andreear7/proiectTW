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