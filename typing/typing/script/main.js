//
let typeTime = 0;
let textPassage = "practice make perfect. every "+ 
  "time you repeat this, lesson, "+  
  "your speed will increase."
let Passage = document.querySelector("#Passage");
let wordsNumber = 0;
let words = new Array;
let letters = [[],[]];
let wordIndex = 0;
let letterIndex = 0;
let now_Word,now_letter;
let theLetter = "";
let startwordNumber = 0;
let startletterdNumber = -1;
let allNumber = -1;
let right = document.querySelector(".right");
let error = document.querySelector(".error");
let past = document.querySelector(".past");
let errorNumber = 0;
let tf = new Array;
let Line = document.querySelector("#Linemain");
let SpeedDate = document.querySelector(".SpeedDate");
let AccurecyDate = document.querySelector(".AccurecyDate");
let testTime = 0;
let testWords = 1;
let timer = null;
let speed = 0;

// start buttum
startGame();
function startGame(){
  testTime = 0;
  testWords = 0;
  showPassage();
//  clearInterval(timer); 
//  timer = setInterval(nowTimer, 1000);
}
function showPassage() {  
  words = textPassage.split(" ");
  wordsNumber = words.length;
  for(let i = 0; i < wordsNumber; i++){
    now_Word = document.createElement('span');
    if(i < wordsNumber-1)
      words[i] = words[i] + [" "];
    Passage.appendChild(now_Word);
    letters[i] = words[i].split("");
    for(let j = 0; j <letters[i].length; j++){
      now_letter = document.createElement('span');
      now_letter.innerHTML = letters[i][j];
      now_letter.classList.add('type_letter');
      now_Word.appendChild(now_letter);
    }
    tf[i] = true;
  }
}

//get letter
document.onkeydown=function(event){
  let e =  window.event;
  theLetter = String.fromCharCode(e.keyCode);
  if(theLetter >= "A" && theLetter <= "Z") 
  theLetter = String.fromCharCode(e.keyCode+32);
  else if(theLetter == "¼") 
    theLetter = ",";
  else if(theLetter == "¾") 
    theLetter = ".";
  else if(theLetter == "Þ") 
    theLetter = "\"";
  else if(theLetter == "¿") 
    theLetter = "?";
  else if(theLetter == "º") 
    theLetter = ";";
  startletterdNumber++;
  allNumber++;
  if(startletterdNumber >= letters[startwordNumber].length){
    startwordNumber++;
    startletterdNumber = 0;
  }

  //compare
  let letterArr = document.querySelectorAll('.type_letter');
  if(letters[startwordNumber][startletterdNumber] == theLetter){
    letterArr[allNumber].classList.add('Rignt');  
    if(startletterdNumber == letters[startwordNumber].length-1 && tf[startwordNumber]){
      right.play();
    }
  }else {
    letterArr[allNumber].classList.add('Wrong');
    error.play();
    tf[startwordNumber] = false;
  }
  let linef = (allNumber+1)/letterArr.length;
  Line.style.width = (linef*100) + "%";


  //finish a word
  if(startletterdNumber == letters[startwordNumber].length-1){

  }
}

// timer
function nowTimer(){
  testTime += 1;
  speed = parseInt(testTime/testWords);
  SpeedDate.innerHTML = speed;
}
