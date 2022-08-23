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