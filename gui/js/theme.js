


document.addEventListener("DOMContentLoaded", function() {
  // Code to be executed when the DOM is ready
  let value = localStorage.getItem("theme") == "light"?false:true;
  THEME_TOGGLE.checked = value;
  toggleTheme(value);
});

THEME_TOGGLE.addEventListener('change', e=>toggleTheme(e.target.checked));


function toggleTheme(value = false){
  if(!value){
    localStorage.setItem("theme", "light");

    document.documentElement.style.setProperty('--base-dark', "#ddd");
    document.documentElement.style.setProperty('--base-light', "#aaa");
    document.documentElement.style.setProperty('--base-col1', "#fff");
    document.documentElement.style.setProperty('--base-col2', "#16151a");

    document.documentElement.style.setProperty('--border-color', "#2DAB9F");
    document.documentElement.style.setProperty('--shadow-color', "#236864");

    document.documentElement.style.setProperty('--bg-btn', "#3F6965");
    document.documentElement.style.setProperty('--bg-btn-hover', "#124A44");
    document.documentElement.style.setProperty('--col-btn', "#fff");
    document.documentElement.style.setProperty('--col-btn-hover', "#32CCBC");

    document.documentElement.style.setProperty('--text-col-1', "#32CCBC");
    document.documentElement.style.setProperty('--text-col-2', "#222");
    document.documentElement.style.setProperty('--text-col-3', "#444");
    document.documentElement.style.setProperty('--text-col-4', "#444");
    document.documentElement.style.setProperty('--text-col-5', "#ccc");

    document.documentElement.style.setProperty('--blur-bg', "rgba(0, 0, 0, .4)");
  }else {
    localStorage.setItem("theme", "dark");

    document.documentElement.style.setProperty('--base-dark', "#16151a");
    document.documentElement.style.setProperty('--base-light', "#222227");
    document.documentElement.style.setProperty('--base-col1', "#16151a");
    document.documentElement.style.setProperty('--base-col2', "#fff");

    document.documentElement.style.setProperty('--border-color', "#236864");
    document.documentElement.style.setProperty('--shadow-color', "#233135");


    document.documentElement.style.setProperty('--bg-btn', "#192629");
    document.documentElement.style.setProperty('--bg-btn-hover', "#2E3A3C");
    document.documentElement.style.setProperty('--col-btn', "#32CCBC");
    document.documentElement.style.setProperty('--col-btn-hover', "#fff");

    document.documentElement.style.setProperty('--text-col-1', "#32CCBC");
    document.documentElement.style.setProperty('--text-col-2', "#fff");
    document.documentElement.style.setProperty('--text-col-3', "#ccc");
    document.documentElement.style.setProperty('--text-col-4', "#999");
    document.documentElement.style.setProperty('--text-col-5', "#444");

    document.documentElement.style.setProperty('--blur-bg', "rgba(0, 0, 0, .8)");
  }
}
