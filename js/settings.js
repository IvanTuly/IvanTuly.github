const navBar = document.querySelector("nav"),
menuBtns = document.querySelectorAll(".mainmenu-icon"),
overlay = document.querySelector(".overlay");
let colorScheme = "red"
var settings = {
    colorScheme: colorScheme
}

if (localStorage.getItem('settings')) {
    //парсим JSON и записываем в массив tasks
    settings = JSON.parse(localStorage.getItem('settings'));
}

console.log(settings)
document.documentElement.style.setProperty('--main-color-scheme', settings.colorScheme);

//открытие и закрытие меню
menuBtns.forEach((menuBtn) => {
menuBtn.addEventListener("click", () => {
  navBar.classList.toggle("open");
});
});
overlay.addEventListener("click", () => {
navBar.classList.remove("open");
});
document.querySelector(".openmenu-icon").addEventListener("click", ()=>{
    navBar.classList.remove("open");
})


//переключение цвета по кнопкам
document.querySelector(".colorButton__colorRed").addEventListener("click", ()=>{
document.documentElement.style.setProperty('--main-color-scheme', 'red');
settings.colorScheme = "red"
saveToLocalStorage()
})
document.querySelector(".colorButton__colorBlack").addEventListener("click", ()=>{
    document.documentElement.style.setProperty('--main-color-scheme', 'black');
    settings.colorScheme = "black"
    saveToLocalStorage()
})
document.querySelector(".colorButton__colorGreen").addEventListener("click", ()=>{
document.documentElement.style.setProperty('--main-color-scheme', 'green');
settings.colorScheme = "green"
saveToLocalStorage()
})
document.querySelector(".colorButton__colorBlue").addEventListener("click", ()=>{
document.documentElement.style.setProperty('--main-color-scheme', 'blue');
settings.colorScheme = "blue"
saveToLocalStorage()
})
document.querySelector(".colorButton__colorYellow").addEventListener("click", ()=>{
document.documentElement.style.setProperty('--main-color-scheme', 'yellow');
settings.colorScheme = "yellow"
saveToLocalStorage()
})
document.querySelector(".colorButton__colorPink").addEventListener("click", ()=>{
document.documentElement.style.setProperty('--main-color-scheme', 'pink');
settings.colorScheme = "pink"
saveToLocalStorage()
})
document.querySelector(".colorButton__colorPurple").addEventListener("click", ()=>{
document.documentElement.style.setProperty('--main-color-scheme', 'purple');
settings.colorScheme = "purple"
saveToLocalStorage()
})


function saveToLocalStorage() {
    localStorage.setItem('settings', JSON.stringify(settings));
}

//   const range = document.querySelector('.textSizeSlider')
//   const content = document.querySelector(".sizeChange__example")
//   const tasksContent = document.querySelector(".text")
//   range.addEventListener('input', ()=>{
//     const rangeValue = range.value;
//     content.style.fontSize = rangeValue + "px"
//     tasksContent.style.fontSize = rangeValue + "px"
//   })
