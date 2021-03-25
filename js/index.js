const optionButtons1 = document.getElementsByClassName("question1");
const optionButtons2 = document.getElementsByClassName("question2");
const optionButtons3 = document.getElementsByClassName("question3");
const sections = document.getElementsByTagName("section");
const nextButton = document.getElementsByClassName("button-container")[0].getElementsByTagName("button")[1];
const backButton = document.getElementsByClassName("button-container")[0].getElementsByTagName("button")[0];
//let contentValue = "";
let senderPerson = "";
let recipient = "";
let counter = 0;

//disable next button when window loads.
window.addEventListener('load', (event) => {
  nextButton.removeAttribute("class", "active");
  nextButton.setAttribute("class", "disabled");
})

//set option buttons styles, if selected, change to blue, else, stay as white.
for (const optionButton1 of optionButtons1) {
  optionButton1.addEventListener('click', function(event) {
    if(optionButton1.checked){
      nextButton.setAttribute("class", "active");
      nextButton.addEventListener('click', nextFunction);
      for (const optionButton1 of optionButtons1) {
        try {
          optionButton1.labels[0].removeAttribute("class", "selected");
        }
        catch(err) {
          //do nothing
        }
      }
      optionButton1.labels[0].setAttribute("class", "selected");
    }
  })
}

for (const optionButton2 of optionButtons2) {
  optionButton2.addEventListener('click', function(event) {
    if(optionButton2.checked){
      nextButton.setAttribute("class", "active");
      nextButton.addEventListener('click', nextFunction);
      for (const optionButton2 of optionButtons2) {
        try {
          optionButton2.labels[0].removeAttribute("class", "selected");
        }
        catch(err) {
          //do nothing
        }
      }
      optionButton2.labels[0].setAttribute("class", "selected");
    }
  })
}

for (const optionButton3 of optionButtons3) {
  optionButton3.addEventListener('click', function(event) {
    if(optionButton3.checked){
      nextButton.setAttribute("class", "active");
      nextButton.addEventListener('click', nextFunction);
      for (const optionButton3 of optionButtons3) {
        try {
          optionButton3.labels[0].removeAttribute("class", "selected");
        }
        catch(err) {
          //do nothing
        }
      }
      optionButton3.labels[0].setAttribute("class", "selected");
    }
  })
}


// activate the back button when it's not the first question.
// change the next button copy when it is (not) the last one.
backButton.addEventListener('click', backFunction);

function backFunction() {

  counter--;
  activateBackButton(counter);
  changeNextButtonContent(counter);

  // Next buttion should be always active if we go back
  nextButton.setAttribute("class", "active");

  //set corresponding block's display.
  for (const section of sections) {
    section.style.display = "none";
  }
  sections[counter].style.display = "block";
}

function activateBackButton(counter) {
  if(counter > 0){
    backButton.setAttribute("class", "backButtonActive");
    backButton.setAttribute("class", "active");
    backButton.addEventListener('click', backFunction);
  }else{
    backButton.removeAttribute("class", "backButtonActive");
    backButton.setAttribute("class", "disabled");
    backButton.removeEventListener('click', backFunction);
  }
}

function nextButtonActivateOrNot(counter){
  nextButton.removeAttribute("class", "active");
  nextButton.setAttribute("class", "disabled");
  nextButton.removeEventListener('click', nextFunction);
  let nextSection = counter;

  if (counter  === 3){
    nextButton.removeAttribute("class", "active");
    nextButton.setAttribute("class", "disabled");
    textfieldOne = document.getElementsByClassName("textfield")[0];
    textfieldTwo = document.getElementsByClassName("textfield")[1];
    let activateButtonSwitchOne = textfieldOne.value !== "";
    let activateButtonSwitchTwo = textfieldTwo.value !== "";
    textfieldFilled(activateButtonSwitchOne, activateButtonSwitchTwo);

    textfieldOne.addEventListener('keyup', (event) => {
      if (textfieldOne.value === ""){
        activateButtonSwitchOne = false;
      }else{
        activateButtonSwitchOne = true;
      }

      textfieldFilled(activateButtonSwitchOne, activateButtonSwitchTwo);
    })

    textfieldTwo.addEventListener('keyup', (event) => {
      if (textfieldTwo.value === ""){
        activateButtonSwitchTwo = false;
      }else{
        activateButtonSwitchTwo = true;
      }

      textfieldFilled(activateButtonSwitchOne, activateButtonSwitchTwo);
    })
  }

  if (counter === 4) {
    nextButton.removeAttribute("class", "active");
    nextButton.setAttribute("class", "disabled");
    document.getElementsByTagName("textarea")[0].addEventListener('keyup', (event) => {
      let len = event.target.value.length;
      document.getElementById("characterCount").innerHTML = len;
      if (event.target.value == "") {
        nextButton.removeAttribute("class", "active");
        nextButton.setAttribute("class", "disabled");
      } else {
        nextButton.setAttribute("class", "active");
      }
    });
    return;
  }
  for (const button of document.getElementsByTagName("form")[nextSection].getElementsByTagName("input")){
    if(button.checked){
      nextButton.setAttribute("class", "active");
      nextButton.addEventListener('click', nextFunction);
    }
  }
}

function textfieldFilled (activateButtonSwitchOne, activateButtonSwitchTwo){
  if (activateButtonSwitchOne === true && activateButtonSwitchTwo === true){
    nextButton.setAttribute("class", "active");
    nextButton.removeAttribute("class", "disabled");
    nextButton.addEventListener('click', nextFunction);
    senderPerson = document.getElementsByClassName("textfield")[0].value;
    recipient = document.getElementsByClassName("textfield")[1].value;
    localStorage.setItem("localStorageTwo", senderPerson);
    localStorage.setItem("localStorageThree", recipient);
  }else{
    nextButton.removeAttribute("class", "active");
    nextButton.setAttribute("class", "disabled");
    nextButton.removeEventListener('click', nextFunction);
  }
}

function nextFunction() {
  counter++;

  //back button is automatically activated when next button is clicked.
  activateBackButton(counter);

  //set corresponding block's display.
  for (const section of sections) {
    section.style.display = "none";
  }
  sections[counter].style.display = "block";

  // change the next button copy when it is (not) the last one.
  changeNextButtonContent(counter);
  nextButtonActivateOrNot(counter);
}

// change the next button copy when it is (not) the last one.
// change the next button link when it is (not) the last one.
function changeNextButtonContent(counter){
  if(counter === sections.length-1){
    nextButton.innerHTML = "Submit";
    nextButton.removeEventListener('click', nextFunction);
    nextButton.addEventListener('click', goToPostcardPage);
  }else{
    nextButton.innerHTML = "Next";
    nextButton.removeEventListener('click', goToPostcardPage);
    nextButton.addEventListener('click', nextFunction);
  }
}

// open a new html file for the postcard.
function goToPostcardPage(){
  content = document.getElementsByTagName("textarea")[0].value;
  localStorage.setItem("localStorageOne", content);
  window.open("postcard.html", "_self");
}
