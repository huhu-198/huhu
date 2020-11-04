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
let theLetter = "";
let linef;
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
let testTime = 0.1;
let testWords = 0;
let timer;
let speed = 0;
let letterArr;
let get = true;
let accurecy;
let now_Word;
let timet = 0;
let a= new Array;
let everyV = new Array ;
  everyV[0]=0;
let headerStart = document.querySelector(".headerStart");
let headerStop = document.querySelector(".headerStop");
let startbuttonimg = document.querySelector(".startbuttonimg");
showPassage();



//get word
function showPassage() {  
  words = textPassage.split(" ");
  wordsNumber = words.length;
  for(let i = 0; i < wordsNumber; i++){
    now_Word = document.createElement('span');
    if(i < wordsNumber-1)
      words[i] = words[i] + [" "];
    Passage.appendChild(now_Word);
      a[i]=document.createElement('div')
      now_Word.appendChild(a[i]);
      a[i].innerHTML = ("&nbsp");
      a[i].classList.add('everySpeed');

    letters[i] = words[i].split("");
    for(let j = 0; j <letters[i].length; j++){
      let now_letter = document.createElement('span');
      now_letter.innerHTML = letters[i][j];
      now_letter.classList.add('type_letter');
      now_Word.appendChild(now_letter);
    }
    tf[i] = true;
  }
}

//get code
function startGame() {
 
document.onkeydown=function(event){
  if(!get)
    return ;
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
   letterArr = document.querySelectorAll('.type_letter');
  if(startletterdNumber == letters[startwordNumber].length-1){
    testWords++;
    everyV[testWords] = testTime;
  // follow
    follow();
    function follow (){
      for(let i = 0;i < testWords; i++){
        a[i].innerHTML = parseInt(60/(everyV[i+1]-everyV[i])) + "wpm";
      }
    }
    if(testWords == words.length){
      reset();
      alert();
    }
  }
  if(letters[startwordNumber][startletterdNumber] == theLetter){
    letterArr[allNumber].classList.add('Rignt');  
    if(startletterdNumber == letters[startwordNumber].length-1 && tf[startwordNumber]){
      right.play();
    }
  }else {
    letterArr[allNumber].classList.add('Wrong');
    errorNumber++;
    error.play();
    tf[startwordNumber] = false;
  }
  linef = (allNumber+1)/letterArr.length;
  Line.style.width = (linef*100) + "%";


  //finish a word
  if(startletterdNumber == letters[startwordNumber].length-1){

  }

  //record errors number
  recordError();
}

}
// start 

function Start(){
  startGame();
  clearInterval(timer); 
  timer = setInterval(nowTimer, 10);
  get = true;
  headerStart.style.display = "none";
  startbuttonimg.style.display = "none";
  headerStop.style.display = "inline-block";
}

// stop
function stopTimer(){
  clearInterval(timer); 
  get = false;
  headerStop.style.display = "none";
  startbuttonimg.style.display = "block";
  headerStart.style.display = "inline-block";
}

//errors
function recordError(){
  accurecy = parseInt((allNumber - errorNumber + 1)/ (allNumber+1) * 100);
  if(accurecy === NaN) accurecy = 100;
  AccurecyDate.innerHTML = accurecy + "%";
}


// timer
function nowTimer(){
  testTime += 0.01;
  timet++;
  if(timet % 100 ==0){
    speed = parseInt(testWords / testTime * 60);
  if(speed < 1)
    speed = 1;
  SpeedDate.innerHTML = speed;
  }
}

// reset
function reset(){
  stopTimer();
  SpeedDate.innerHTML = "10";
  AccurecyDate.innerHTML = "100%";
  testTime = 0.1;
  Line.style.width = "1%";
  typeTime = 0;
  wordIndex = 0;
  letterIndex = 0;
  theLetter = "";
  startwordNumber = 0;
  startletterdNumber = -1;
  allNumber = -1;
  errorNumber = 0;
  testWords = 0;
  wordsNumber = 0;
  words = new Array;
  letters = [[],[]];
  Passage.innerHTML = "";
  showPassage();
}


