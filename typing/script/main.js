//
let typeTime = 0;
let textPassage= [[],[]];
  textPassage[0] = "practice makes perfect. every "+ 
  "time you repeat this lesson, "+  
  "your speed will increase."
  textPassage[1] = "practice can't get perfect. every "+ 
  "time you repeat this lesson, "+  
  "will be useless."
  textPassage[2] = "practice is important. every "+ 
  "time you repeat this lesson, "+  
  "will be a treasure."
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
let defeat = document.querySelector(".defeat");
let testTime = 0.1;
let testWords = 0;
let timer;
let timershow;
let speed = 0;
let letterArr;
let get = true;
let accurecy;
let now_Word;
let timet = 0;
let everyV= new Array;
let everyVdata = new Array ;
  everyVdata[0]=0;
let headerStart = document.querySelector(".headerStart");
let headerStop = document.querySelector(".headerStop");
let startbuttonimg = document.querySelector(".startbuttonimg");
let pastMain = document.querySelector(".pastMain");
let starBstarL = document.querySelector(".starBstarL");
let starBstarM = document.querySelector(".starBstarM");
let starBstarR = document.querySelector(".starBstarR");
let congratulation = document.querySelector(".congratulation");
let showt = 0;
let gameMark;
let marks = new Array;
let marknumber = 0;



showPassage();



//get word
function showPassage() {  
  words = textPassage[0].split(" ");
  wordsNumber = words.length;
  for(let i = 0; i < wordsNumber; i++){
    now_Word = document.createElement('span');
    if(i < wordsNumber-1)
      words[i] = words[i] + [" "];
    Passage.appendChild(now_Word);
      everyV[i]=document.createElement('div')
      now_Word.appendChild(everyV[i]);
      everyV[i].innerHTML = ("&nbsp");
      everyV[i].classList.add('everySpeed');

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
    else if(e.keyCode >= 188 && e.keyCode <= 190) 
      theLetter =String.fromCharCode(e.keyCode-144);
    else if(e.keyCode == 186) 
      theLetter = ";";
    else if(e.keyCode == 191) 
      theLetter = "?";
    else if(e.keyCode == 222) 
      theLetter = "\"";
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
        return;
      }
    }
    if(letters[startwordNumber][startletterdNumber] == theLetter){    
      letterArr[allNumber].classList.add('Rignt');  
      if(startletterdNumber == letters[startwordNumber].length-1){                            //finish a word
        let wordV = parseInt(60/(everyVdata[startwordNumber+1]-everyVdata[startwordNumber]));
        everyV[startwordNumber].innerHTML = wordV + "wpm";
        if(tf[startwordNumber]){                                                              //the word right
        right.play();
        everyV[startwordNumber].innerHTML = everyV[startwordNumber].innerHTML + "&nbspgood";
        }
      }
    }else {                                                                                   //the word wrong
      letterArr[allNumber].classList.add('Wrong');                            
      errorNumber++;
      error.play();
      tf[startwordNumber] = false;
    }
    linef = (allNumber+1)/letterArr.length;
    Line.style.width = (linef*100) + "%";

    //record errors number
    recordError();
  }
}

// start game
function Start(){
  startGame();
  clearInterval(timer); 
  timer = setInterval(nowTimer, 10);
  get = true;
  headerStart.style.display = "none";
  startbuttonimg.style.display = "none";
  headerStop.style.display = "inline-block";
}

// stop game
function stopTimer(){
  clearInterval(timer); 
  get = false;
  headerStop.style.display = "none";
  startbuttonimg.style.display = "block";
  headerStart.style.display = "inline-block";
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
  clearInterval(timershow, 10); 
  gameMark = 0;
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
  }else if(accurecy < 80)
    gameMark = 1;
  else if(accurecy < 100 || speed < 30)
    gameMark = 2;
  else 
    gameMark = 3;
  timershow = setInterval(showTimer, 10);
  marks[marknumber] = gameMark;
  marknumber++;
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
  }
}

// show my mark
function loadSubmit(){
  
}
  
  


