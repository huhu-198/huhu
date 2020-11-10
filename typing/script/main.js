//
let typeTime = 0;
let textPassage= [[],[]];
  textPassage[1] = "practice makes perfect. every time you repeat this lesson, "+  
  "your speed will increase."
  textPassage[2] = "practice can't get perfect. every time you repeat this lesson, "+  
  "your speed can't change.."
  textPassage[3] = "practice makes perfect. every time you repeat this lesson, "+  
  "your speed will increase..."
let Passage = document.querySelector("#Passage");
let showlevel = document.querySelector(".showlevel");
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
let defeat = document.querySelector(".defeat");
let testTime = 0.1;
let testWords = 0;
let timer;
let timershow;
let timerback;
let speed = 0;
let letterArr;
let get = true;
let accurecy;
let now_Word;
let timet = 0;
let everyV = new Array;
let everyVdata = new Array;
    everyVdata[0] = 0;
let headerStart = document.querySelector(".headerStart");
let headerStop = document.querySelector(".headerStop");
let headerStartback = document.querySelector(".headerStartback");
let headerStopback = document.querySelector(".headerStopback");
let startbutton = document.querySelector(".startbutton");
let startbuttonimg = document.querySelector(".startbuttonimg");
let pastMain = document.querySelector(".pastMain");
let starBstarL = document.querySelector(".starBstarL");
let starBstarM = document.querySelector(".starBstarM");
let starBstarR = document.querySelector(".starBstarR");
let congratulation = document.querySelector(".congratulation");
let showt = 0;
let gameMark;
let userNamemark = new Array;
let marks = new Array;
let marknumber = 1;
let user = document.querySelector(".user>a");
let mymarks = document.querySelector(".marks");
let level1Mark = document.querySelector(".level1Mark>span");
let level1Accurecy = document.querySelector(".level1Accurecy>span");
let level1Speed = document.querySelector(".level1Speed>span");
let level2Mark = document.querySelector(".level2Mark>span");
let level2Accurecy = document.querySelector(".level2Accurecy>span");
let level2Speed = document.querySelector(".level2Speed>span");
let level3Mark = document.querySelector(".level3Mark>span");
let level3Accurecy = document.querySelector(".level3Accurecy>span");
let level3Speed = document.querySelector(".level3Speed>span");

let Back = document.querySelector(".Back");
let backMidLine = document.querySelector(".backMidLine");
let backBottomLine = document.querySelector(".backBottomLine");
let backt = 0;

// back button act
/*
Back.onmouseover = function(){
  timerback = setInterval(backtimer, 10);
}
function backtimer(){
  backt++;
  backMidLine.style.transform = "rotate("+(0.4*backt)+"deg) ";
  backBottomLine.style.transform = "rotate("+(0.9*backt)+"deg)";//+"scale(1-0.001*backt)";
  backBottomLine.style.top = 0.23*backt + "px";
  backBottomLine.style.left = -0.12*backt + "px";
  if(backt == 100)
  console.log(1);
    clearInterval(timerback);


  
  starBstarL.style.transform= "rotate("+(15*showt-60)+"deg)";
}
*/


// get word
showPassage();
function showPassage() {  
  userName = window.localStorage.getItem("now");
  if(userName != null)  
    user.innerHTML = userName;
  showlevel.innerHTML = "level&nbsp" + marknumber;
  words = textPassage[marknumber].split(" ");
  wordsNumber = words.length;
  for(let i = 0; i < wordsNumber; i++){
    now_Word = document.createElement('span');
    if(i < wordsNumber-1)
      words[i] = words[i] + [" "];
    Passage.appendChild(now_Word);
      everyV[i] = document.createElement('div')
      now_Word.appendChild(everyV[i]);
      everyV[i].innerHTML = ("&nbsp");
      everyV[i].classList.add('everySpeed');

    letters[i] = words[i].split("");
    for(let j = 0; j < letters[i].length; j++){
      let now_letter = document.createElement('span');
      now_letter.innerHTML = letters[i][j];
      now_letter.classList.add('type_letter');
      now_Word.appendChild(now_letter);
    }
    tf[i] = true;
  }
}

//get keyboardcode
function startGame(){ 
  document.onkeydown=function(event){
    if(!get)
      return ;
    let e =  window.event;
    theLetter = String.fromCharCode(e.keyCode);
    if(theLetter >= "A" && theLetter <= "Z") 
      theLetter = String.fromCharCode(e.keyCode+32);
    else if(e.keyCode >= 188 && e.keyCode <= 190) 
      theLetter = String.fromCharCode(e.keyCode-144);
    else if(e.keyCode == 186) 
      theLetter = ";";
    else if(e.keyCode == 191) 
      theLetter = "?";
    else if(e.keyCode == 222) 
      theLetter = "\'";
    startletterdNumber++;
    allNumber++;
    if(startletterdNumber >= letters[startwordNumber].length){
      startwordNumber++;
      startletterdNumber = 0;
    }
    // compare
    letterArr = document.querySelectorAll('.type_letter');
    if(startletterdNumber == letters[startwordNumber].length-1){
      testWords++;
      everyVdata[testWords] = testTime;
    //game over
      if(testWords == words.length){                                                          //finish the passage
        gameOver();
        return ;
      }
    }

    // change startbutton
    let h=letterArr[allNumber].offsetTop;
    let l=letterArr[allNumber].offsetLeft;
    if(h == 26){
      startbutton.style.left = (l+295) + "px";
      startbutton.style.top = 70 + "px";
    }else{
      startbutton.style.top = (h+90) + "px";
      startbutton.style.left = 180 + "px";
    }

    if(letters[startwordNumber][startletterdNumber] == theLetter){    
      letterArr[allNumber].classList.add('Rignt');  
      if(startletterdNumber == letters[startwordNumber].length-1){                                //finish a word
        let wordV = parseInt(60 / (everyVdata[startwordNumber+1] - everyVdata[startwordNumber]));
        everyV[startwordNumber].innerHTML = wordV + "wpm";
        if(tf[startwordNumber]){                                                                  //the word right
        right.play();
        everyV[startwordNumber].innerHTML = everyV[startwordNumber].innerHTML + "&nbspgood";
        }
      }
    }else {                                                                                       //the word wrong
      letterArr[allNumber].classList.add('Wrong');                            
      errorNumber++;
      error.play();
      tf[startwordNumber] = false;
    }
    linef = (allNumber+1) / letterArr.length;
    Line.style.width = (linef*100) + "%";
    recordError();                                                                                //record errors number
  }
}

// start game
function Start(){
  startGame();
  clearInterval(timer); 
  timer = setInterval(nowTimer, 10);
  get = true;
  headerStart.style.display = "none";
  headerStartback.style.display = "none";
  startbuttonimg.style.display = "none";
  headerStopback.style.display = "inline-block";
  headerStop.style.display = "inline-block";
}

// stop game
function stopTimer(){
  clearInterval(timer); 
  get = false;
  headerStop.style.display = "none";
  headerStopback.style.display = "none";
  startbuttonimg.style.display = "block";
  headerStart.style.display = "inline-block";
  headerStartback.style.display = "inline-block";
}

//update accurecy 
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
  pastMain.style.display = "none";
  clearInterval(timershow); 
  gameMark = 0;
  starBstarL.style.opacity = 0;
  starBstarM.style.opacity = 0;
  starBstarR.style.opacity = 0;
  showt = 0;
  mymarks.style.display = "none";
  startbutton.style.left = 302 + "px";
  startbutton.style.top = 70 + "px";
}

// gameover
function gameOver(){
  get = 0;
  stopTimer();
  pastMain.style.display = "block";
  if(accurecy < 50){
    gameMark = 0;
    congratulation.innerHTML = "&nbsp&nbsp&nbsp&nbsp&nbsp&nbspdefeat";
    defeat.play();
  }else if(accurecy < 80  || speed < 15)
    gameMark = 1;
  else if(accurecy < 100 || speed < 20)
    gameMark = 2;
  else 
    gameMark = 3;
  timershow = setInterval(showTimer, 10);
  
  // save user's data  (avarage)  (name levelnmber:mark accurecy speed times) 
  let levelmark = keywords.getItem(userName + " " + marknumber);
  if (levelmark == null){
    window.localStorage.setItem(userName + " " + marknumber, gameMark + " " + accurecy + " " + speed + " 1");
    return;
  }
  let theMark = levelmark.split(" ");
  let avarageMark = theMark[0];
  let avarageAccurecy = theMark[1];
  let avarageSpeed = theMark[2];
  let timesNumber = theMark[3];
  timesNumber++;
  avarageMark = ((avarageMark + gameMark) / timesNumber).toFixed(1);
  avarageAccurecy = ((avarageAccurecy + gameMark) / timesNumber).toFixed(1);
  avarageSpeed = ((avarageSpeed + gameMark) / timesNumber).toFixed(1);
  window.localStorage.setItem(userName + " " + marknumber, avarageMark + " " + avarageAccurecy + " " + avarageSpeed + " " + timesNumber);
}

//showTimer
function showTimer(){
  showt++;
  if(showt <= 50 && gameMark >= 1){
    past.play();
    starBstarL.style.opacity = showt/50;
    starBstarL.style.transform= "rotate("+(15*showt-60)+"deg)";
  }else if(showt > 70 && showt <=120 && gameMark >= 2){
    starBstarM.style.opacity = (showt-70)/50;
    starBstarM.style.transform= "rotate("+(15*showt)+"deg)";
  }else if(showt > 150 && showt <= 200 && gameMark >= 3){
    starBstarR.style.opacity = (showt-150)/50;
    starBstarR.style.transform= "rotate("+(15*showt-130)+"deg)";
  }else if(showt > 2500)
    clearInterval(timershow);
}

// show my mark
function myMark(){
  if(mymarks.style.display == "none")
    mymarks.style.display = "block";
  else
    mymarks.style.display = "none";
  for(let i = 1 ; i <= 3 ; i++){
    let levelmark = keywords.getItem(userName + " " + i);
    if (levelmark == null)
      return;
    let theMark = levelmark.split(" ");
    let avarageMark = theMark[0];
    let avarageAccurecy = theMark[1];
    let avarageSpeed = theMark[2];
    if(i == 1){
      level1Mark.innerHTML = avarageMark;
      level1Accurecy.innerHTML = avarageAccurecy;
      level1Speed.innerHTML = avarageSpeed;
    }else if (i == 2){
      level2Mark.innerHTML = avarageMark;
      level2Accurecy.innerHTML = avarageAccurecy;
      level2Speed.innerHTML = avarageSpeed;
    }else if (i == 3){
      level3Mark.innerHTML = avarageMark;
      level3Accurecy.innerHTML = avarageAccurecy;
      level3Speed.innerHTML = avarageSpeed;
    }
  }
}

// choose level
function level1(){
  marknumber = 1;
  reset();
}
function level2(){
  marknumber = 2;
  reset();
}
function level3(){
  marknumber = 3;
  reset();
}
  
  


