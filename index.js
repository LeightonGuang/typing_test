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
  "could", 'may', "I", "said", "so", "people", "part"];

let onIndex = 0;
let history = [];
let subHistory = [];

let typedHistory = [];
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
    //removes the space in front
    e.preventDefault();
    typedSubHistory.push(typeField.value + " ");
    p3.innerHTML += (" " + typeField.value);
    typeField.value = "";
    console.log(typedHistory[typedHistory.length - 1]);

    if(typedSubHistory.length == subHistory.length){
      typedHistory.push(typedSubHistory);
      typedSubHistory = [];
    }
    console.log(typedHistory[typedHistory.length - 1]);
  }

  //if backspace is pressed
  if(typeField.value == "" && e.code == "Backspace"){
    if(typedSubHistory.length == 0){
      console.log(typedHistory);
    }else{
      console.log("backspace");
      typeField.value = history[history.length - 1];
      typedDisplay.innerHTML = typedDisplay.innerHTML.substring(0, typedDisplay.innerHTML.lastIndexOf(" "));
      history.pop();
      console.log(history);
    }
  }
});

//=====================================================

function restart(){
  history = [];
  console.log(history);
  typeField.value = "";
  p1.innerHTML = " ";
  p2.innerHTML = " ";
  p3.innerHTML = " ";
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
  p1.innerHTML = p2.innerHTML;
  p2.innerHTML = p3.innerHTML;
  p3.innerHTML = "new";
  while(checkOverflow(typedDisplay) == false){
    let randomIndex = Math.floor(Math.random() * randomWords.length);
    subHistory.push(randomWords[randomIndex]);
    p3.innerHTML = subHistory.join(" ");
  }
  //remove last element and put to new <p>
  let temp = subHistory.pop();
  p3.innerHTML = subHistory.join(" ");
  history.push(subHistory);
  subHistory = [temp];
  console.log(history[history.length - 1]);
}

//=====================================================

function checkCorrect(){
  if(subHistory[subHistory.length - 1] == typedSubHistory[typedSubHistory.length - 1]){
    correctHistory.push(true);
  }
}

//=====================================================

function addSpan(){
  let randomIndex = Math.floor(Math.random() * randomWords.length);
  p1.innerHTML = p2.innerHTML;
  p2.innerHTML = p3.innerHTML;
  subHistory.push(`<span>${randomWords[randomIndex]}</span>`);
  p3.innerHTML = subHistory;
}

//=====================================================

function start(){
  generateWords();
  generateWords();
}

start();