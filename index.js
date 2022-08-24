let history = [];


//=====================================================
let typing = document.querySelector("#typingID");
let typedDisplay = document.querySelector("#typedDisplayID");

typing.addEventListener("keydown", (e) => {
  if(e.code == "Space"){
    //removes the space in front
    e.preventDefault();
    history.push(typing.value + " ");
    typedDisplay.innerHTML += (" " + typing.value);
    typing.value = "";
    console.log(history);
  }

  if(typing.value == "" && e.code == "Backspace"){
    if(history.length == 0){
      console.log(history);
    }else{
      console.log("backspace");
      typing.value = history[history.length - 1];
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
  typing.value = "";
  typedDisplay.innerHTML = "";
}

let randomWords = ["the", "at", "there", "some", "my", "of", "be", "use", "her", "than", 
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