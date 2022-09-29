let randomWords = [
  "the", "at", "there", "some", "my", "of", "be", "use", "her", "than", 
  "and", "this", "an", "would", "first", "a", "have", "each", "make", 
  "water", "to", "from", "which", "like", "been", "in", "or", "she", 
  "him", "call", "is", "one", "do", "into", "who", "you", "had", "how",	
  "time", "oil", "that", "by", "their", "has", "its", "it", "word", "if", 
  "look", "now", "he", "but", "will", "two", "find", "was", 
  "not", "up", "more", "long", "for", "what", "other", "write", "down",
  "on", "all", "about", "go", "day", "are", "were", "out", "see", "did",
  "as", "we", "many", "number", "get", "with", "when", "then", "no", 
  "come", "his", "your", "them", "way", "made", "they", "can", "these",
  "could", 'may', "I", "said", "so", "people", "part"
];

let startTime = false;

let letters = 0;
let wrongWords = 0;
let seconds = 61;

let wpm_calc;

let onTypedSubArrayIndex = 0;
let onArray;

//array should only be words, add span element with function

//stores whats generated
let wordsArray = [];

//store which array index it's one
let wordsArrayIndex = 0;

//stores whats typed
let typedArray = [];

//array user is working on
let typedSubArray = [];

//=====================================================
let typeField = document.querySelector("#typingID");
let typedDisplay = document.querySelector("#wordsID");
let p1 = document.querySelector("#p1");
let p2 = document.querySelector("#p2");
let p3 = document.querySelector("#p3");
let wpm = document.querySelector("#wpm");
let numWrongWords = document.querySelector("#wrongWords");
let timer = document.querySelector("#timer");

//focus on textbox when site loads
typeField.focus();

typeField.addEventListener("keydown", (e) => {
  //if spacebar is pressed
  if(e.code == "Space"){
    //if there are words in type field when space is pressed
    if(typeField.value != ""){
      onArray = wordsArray[wordsArrayIndex];
      console.log("space");
      //removes the space
      e.preventDefault();
      typedSubArray.push(typeField.value + " ");
      replaceWord(onArray, typeField.value);
      console.log(`onTypedSubArrayIndex: ${onTypedSubArrayIndex} \ttypedArray length: ${typedArray.length} \ntypedSubArray: ${typedSubArray}`);
      console.log(`wordsArrayIndex: ${wordsArrayIndex} \nonArray: ${onArray}`);
      p2.innerHTML = onArray.join(" ");
      onTypedSubArrayIndex++;
      typeField.value = "";

    //if there are no words
    }else if (typeField.value == ""){
      //removes the space
      e.preventDefault();
      typeField.value = "";
      console.log("nothing to delete");
    }
    

    //if reached the end of the array, reset index
    if(wordsArray[wordsArrayIndex].length == typedSubArray.length){
      console.log(typedSubArray);
      typedArray.push(typedSubArray);
      typedSubArray = [];
      onTypedSubArrayIndex = 0;
      wordsArrayIndex++;
      //if there already words created before then skip generate
      if(wordsArrayIndex == wordsArray.length - 1){
        generateWords();
      }else{
        p1.innerHTML = wordsArray[wordsArrayIndex - 1].join(" ");
        p2.innerHTML = wordsArray[wordsArrayIndex].join(" ");
        p3.innerHTML = wordsArray[wordsArrayIndex + 1].join(" ");
      }
      onArray = wordsArray[wordsArray.length - 2];
      console.log("reaced the end of wordsArray");
    }
  }

  //*Fix* if backspace is pressed
  if(typeField.value == "" && e.code == "Backspace"){
    
    //if at the start of the array
    if(onTypedSubArrayIndex == 0 && typedArray.length == 0){
      console.log("nothing left to delete");
    
    //if it reached the front of typedsubArray but there are still arrays in front
    }else if(onTypedSubArrayIndex == 0 && typedArray.length != 0){
      wordsArrayIndex--;
      onArray = wordsArray[wordsArrayIndex];
      //if it reaches the top of the words array
      console.log("scroll up");  
      console.log("replace typedSubArray with the one before");
      typedSubArray = typedArray[typedArray.length - 1];
      console.log("remove array from typed Array");
      typedArray.pop();
      onTypedSubArrayIndex = typedSubArray.length - 1;
      wordsArray[wordsArrayIndex][onTypedSubArrayIndex] = extract(wordsArray[wordsArrayIndex][onTypedSubArrayIndex]);
      //removing the space at the end
      if(wordsArray[wordsArrayIndex][onTypedSubArrayIndex] == typedSubArray[onTypedSubArrayIndex].slice(0, -1)){
        letters -= wordsArray[wordsArrayIndex][onTypedSubArrayIndex].length;
      }
        
      if((wordsArrayIndex - 1 < 0)){
        p1.innerHTML = " ";
      }else{
        p1.innerHTML = wordsArray[wordsArrayIndex - 1].join(" ");
      }
      p2.innerHTML = wordsArray[wordsArrayIndex].join(" ");
      p3.innerHTML = wordsArray[wordsArrayIndex + 1].join(" ");
      console.log(`typedArray: ${typedArray} \ntypedSubArray: ${typedSubArray}`);
      console.log(`onArray: ${onArray}`)
      typeField.value = typedSubArray[typedSubArray.length - 1];
      typedSubArray.pop();
    
    //going back 1 word
    }else{
      onTypedSubArrayIndex--;
      console.log("remove color from words");
      wordsArray[wordsArrayIndex][onTypedSubArrayIndex] = extract(wordsArray[wordsArrayIndex][onTypedSubArrayIndex]);
      //removing the space at the end
      if(wordsArray[wordsArrayIndex][onTypedSubArrayIndex] == typedSubArray[onTypedSubArrayIndex].slice(0, -1)){
        letters -= wordsArray[wordsArrayIndex][onTypedSubArrayIndex].length;
      }
      p2.innerHTML = onArray.join(" ");
      typeField.value = typedSubArray[typedSubArray.length - 1];
      console.log(`typedSubArray: ${typedSubArray}`);
      console.log(`onArray: ${onArray}`)
      typedSubArray.pop();
    }
  }
  if(typedArray.length > 0 || typedSubArray.length > 0 || typeField.value != ""){
    startTime = true;
  }

  wpm_calc = parseFloat(letters / 5 / ((60 - seconds)/60));
  
  //if its negative ir infinity number
  if(wpm_calc <= 0 || !(isFinite(wpm_calc))){
    wpm.innerHTML = (0).toFixed(2);
  
  }else{
    console.log("not infinity: " + wpm_calc);
    wpm.innerHTML = wpm_calc.toFixed(2);
  }
  numWrongWords.innerHTML = wrongWords;
});

//=====================================================

function restart(){
  typeField.removeAttribute("disabled");
  letters = 0;
  startTime = false;
  timer.innerHTML = 60;
  seconds = 61;
  wrongWords = 0;
  numWrongWords.innerHTML = wrongWords;
  wpm.innerHTML = (0).toFixed(2);
  onTypedSubArrayIndex = 0;
  wordsArray = [];
  wordsArrayIndex = 0;
  typedSubArray = [];
  typedArray = [];
  typeField.value = "";
  p1.innerHTML = " ";
  p2.innerHTML = " ";
  p3.innerHTML = " ";
  start();
  typeField.focus();
}

//=====================================================

function checkOverflow(el)
{
   let curOverflow = el.style.overflow;

   if ( !curOverflow || curOverflow === "visible" )
      el.style.overflow = "hidden";

   let isOverflowing = el.clientWidth < el.scrollWidth 
      || el.clientHeight < el.scrollHeight;

   el.style.overflow = curOverflow;

   return isOverflowing;
}

//=====================================================

function generateWords(){
  let tempArr = [];
  console.log("scroll down");
  p1.innerHTML = p2.innerHTML;
  p2.innerHTML = p3.innerHTML;
  p3.innerHTML = "new";
  while(checkOverflow(typedDisplay) == false){
    let randomIndex = Math.floor(Math.random() * randomWords.length);
    //if there are two same words in a row
    while(tempArr[tempArr.length - 1] == randomWords[randomIndex]){
      randomIndex = Math.floor(Math.random() * randomWords.length);
    }
    tempArr.push(randomWords[randomIndex]);
    p3.innerHTML = tempArr.join(" ");
  }
  //remove last element and put to new <p>
  let temp = tempArr.pop();
  p3.innerHTML = tempArr.join(" ");
  wordsArray.push(tempArr);
  tempArr = [temp];
  console.log(`new words generated: ${wordsArray[wordsArray.length - 1]}`);
}

//=====================================================

function replaceWord(wordArray, typed){
  if(wordArray[onTypedSubArrayIndex] == typed){
    letters += wordsArray[wordsArrayIndex][onTypedSubArrayIndex].length;
    console.log("replace word green");
    wordArray.splice(onTypedSubArrayIndex, 1, `<span style = "color: rgb(71, 255, 65)">${wordArray[onTypedSubArrayIndex]}</span>`);

  }else{
    wrongWords++;
    console.log("replace word red");
    wordArray.splice(onTypedSubArrayIndex, 1, `<span style = "color: red">${wordArray[onTypedSubArrayIndex]}</span>`);
  }
}

//=====================================================

function extract(str){
  let middle = str.slice(
    str.indexOf(">") + 1,
    str.lastIndexOf("<"),
  );

  let colour = str.slice(
    str.indexOf(":") + 1,
    str.lastIndexOf('"'),
  );
  if(colour == "green"){


  }else if(colour == " red"){
    wrongWords--;
  }
  return middle;
}

//=====================================================

function getTime(){
  if(startTime){
    seconds--;
    timer.innerHTML = seconds;
    if (seconds == 0){
      startTime = false;
      typeField.value = "times up!";
      typeField.disabled = true;
    }
  }
}
setInterval(getTime, 1000);

//=====================================================

function start(){
  generateWords();
  generateWords();
}

start();

function showVar(){
  console.log(`wordsArrayIndex: ${wordsArrayIndex} \t onTypedSubArrayIndex: ${onTypedSubArrayIndex} \t letters: ${letters} \t wrongWords: ${wrongWords} \n onArray: ${onArray}`);
}