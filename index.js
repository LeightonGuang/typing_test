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

let onIndex = 0;
let onArray;

//array should only be words, add span element with function

//stores whats generated
let wordsArray = [];

let wordsArrayIndex = 0;

//stores whats typed
let typedArray = [];

//array user is working on
let typedSubArray = [];

//=====================================================
let typeField = document.querySelector("#typingID");
let typedDisplay = document.querySelector("#typedDisplayID");
let p1 = document.querySelector("#p1");
let p2 = document.querySelector("#p2");
let p3 = document.querySelector("#p3");

typeField.addEventListener("keydown", (e) => {
  //if spacebar is pressed
  if(e.code == "Space"){
    //if there are words in type field when space is pressed
    if(typeField.value != ""){
      onArray = wordsArray[wordsArray.length - 2];
      console.log(onArray);
      //removes the space
      e.preventDefault();
      typedSubArray.push(typeField.value + " ");
      replaceWord(onArray, typeField.value);
      p2.innerHTML = onArray.join(" ");
      typeField.value = "";
      onIndex++;

    //if there are no words
    }else if (typeField.value == ""){
      //removes the space
      e.preventDefault();
      typeField.value = "";
      console.log("nothing typed");
    }
    

    //if reached the end of the array, reset index
    if(wordsArray[wordsArray.length - 2].length == typedSubArray.length){
      generateWords();
      console.log(typedSubArray);
      typedArray.push(typedSubArray);
      typedSubArray = [];
      onIndex = 0;
      wordsArrayIndex++;
    }
  }

  //*Fix* if backspace is pressed
  if(typeField.value == "" && e.code == "Backspace"){
    
    //go back to last array if back to front
    if(onIndex == 0){
      wordsArrayIndex--;
      //wordsArray.splice(wordsArray.length - 2, 1);
      onIndex = wordsArray[wordsArray.length];
      console.log(`number of array left ${wordsArray.length}`);
      typedSubArray = wordsArray[wordsArrayIndex];

    //if nothing left to delete
    }else if(onIndex == 0 && typedArray.length == 0){
      console.log("nothing left to delete");

    
    }else{
      console.log("backspace when empty");
      onIndex--;
      wordsArray[wordsArrayIndex][onIndex] = extract(wordsArray[wordsArrayIndex][onIndex]);
      p2.innerHTML = onArray.join(" ");
      typeField.value = typedSubArray[typedSubArray.length - 1];
      console.log(typedSubArray);
      typedSubArray.pop();
    }
  }
});

//=====================================================

function restart(){
  onIndex = 0;
  wordsArray = [];
  typedSubArray = [];
  typedArray = [];
  typeField.value = "";
  p1.innerHTML = " ";
  p2.innerHTML = " ";
  p3.innerHTML = " ";
  start();
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
  p1.innerHTML = p2.innerHTML;
  p2.innerHTML = p3.innerHTML;
  p3.innerHTML = "new";
  while(checkOverflow(typedDisplay) == false){
    let randomIndex = Math.floor(Math.random() * randomWords.length);
    tempArr.push(randomWords[randomIndex]);
    p3.innerHTML = tempArr.join(" ");
  }
  //remove last element and put to new <p>
  let temp = tempArr.pop();
  p3.innerHTML = tempArr.join(" ");
  wordsArray.push(tempArr);
  tempArr = [temp];
  console.log(`new words ${wordsArray[wordsArray.length - 1]}`);
}

//=====================================================

function replaceWord(wordArray, typed){
  if(wordArray[onIndex] == typed){
    wordArray.splice(onIndex, 1, `<span style = "color: green">${wordArray[onIndex]}</span>`);

  }else{
    wordArray.splice(onIndex, 1, `<span style = "color: red">${wordArray[onIndex]}</span>`);
  }
}

//=====================================================


function extract(str){
  let middle = str.slice(
    str.indexOf(">") + 1,
    str.lastIndexOf("<"),
  );
  return middle;
}

function start(){
  generateWords();
  generateWords();
}

start();