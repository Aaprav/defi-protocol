
$( document ).ready(function() {
  let value = localStorage.getItem("theme") == "light"?false:true;
  $("#theme-toggle-input").prop('checked', value);
  toggleTheme(value);
});

$("#theme-toggle-input").click(function(e){
  toggleTheme(this.checked);
})

function toggleTheme(value = false){
  if(!value){
    localStorage.setItem("theme", "light");

    document.documentElement.style.setProperty('--base-dark', "#ddd");
    document.documentElement.style.setProperty('--base-light', "#aaa");

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
  }else {
    localStorage.setItem("theme", "dark");

    document.documentElement.style.setProperty('--base-dark', "#16151a");
    document.documentElement.style.setProperty('--base-light', "#222227");

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
  }
}
