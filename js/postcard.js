let content = localStorage.getItem("localStorageOne");
let sender = localStorage.getItem("localStorageTwo");
let receiver = localStorage.getItem("localStorageThree");

//set the content as the ones that user inputted.
window.addEventListener('load', (event) => {
  document.getElementsByClassName("content")[0].getElementsByTagName("p")[0].innerHTML = `Hi, ${receiver},`;
  document.getElementsByClassName("content")[0].getElementsByTagName("p")[1].innerHTML = content;
  document.getElementsByClassName("content")[0].getElementsByTagName("p")[2].innerHTML = `Best, ${sender}.`;
})

//change email button representation when hovered.
document.getElementsByTagName("i")[0].addEventListener("mouseover", (event) => {
  document.getElementsByTagName("i")[0].removeAttribute("class", "fas fa-envelope");
  document.getElementsByTagName("i")[0].setAttribute("class", "fas fa-envelope-open");
})

document.getElementsByTagName("i")[0].addEventListener("mouseout", (event) => {
  document.getElementsByTagName("i")[0].removeAttribute("class", "fas fa-envelope-open");
  document.getElementsByTagName("i")[0].setAttribute("class", "fas fa-envelope");
})
