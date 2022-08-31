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
let wordHistory = [];

let wordHistoryIndex = 0;

//stores whats typed
let typedHistory = [];

//array user is working on
let typedSubHistory = [];

//=====================================================
let typeField = document.querySelector("#typingID");
let typedDisplay = document.querySelector("#typedDisplayID");
let p1 = document.querySelector("#p1");
let p2 = document.querySelector("#p2");
let p3 = document.querySelector("#p3");

typeField.addEventListener("keydown", (e) => {
  //if spacebar is pressed
  if(e.code == "Space"){
    onArray = wordHistory[wordHistory.length - 2];
    console.log(onArray);
    //removes the space in front
    e.preventDefault();
    typedSubHistory.push(typeField.value + " ");
    replaceWord(onArray, typeField.value);
    p2.innerHTML = onArray.join(" ");
    typeField.value = "";
    onIndex++;

    //if reached the end of the array, reset index
    if(wordHistory[wordHistory.length - 2].length == typedSubHistory.length){
      generateWords();
      console.log(typedSubHistory);
      typedHistory.push(typedSubHistory);
      typedSubHistory = [];
      onIndex = 0;
      wordHistoryIndex++;
    }
  }

  //*Fix* if backspace is pressed
  if(typeField.value == "" && e.code == "Backspace"){
    console.log("backspace");
    onIndex--;
    wordHistory[wordHistoryIndex][onIndex] = extract(wordHistory[wordHistoryIndex][onIndex]);
    //console.log(extract(typedSubHistory[onIndex]));
    p2.innerHTML = onArray.join(" ");
    typeField.value = typedSubHistory[typedSubHistory.length - 1];
    console.log(typedSubHistory);
    typedSubHistory.pop();
    
    if(onIndex == 0){
      wordHistoryIndex--;
      //wordHistory.splice(wordHistory.length - 2, 1);
      onIndex = wordHistory[wordHistory.length];
      console.log(`number of array left ${wordHistory.length}`);
      typedSubHistory = wordHistory[wordHistoryIndex];
    }
  }
});

//=====================================================

function restart(){
  onIndex = 0;
  wordHistory = [];
  typedSubHistory = [];
  typedHistory = [];
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
  wordHistory.push(tempArr);
  tempArr = [temp];
  console.log(`new words ${wordHistory[wordHistory.length - 1]}`);
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