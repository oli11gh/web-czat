var socket;
var usernameInput
var chatIDInput;
var messageInput;
var chatRoom;
var dingSound;
var messages = [];
var delay = true;

function onload(){
  socket = io();
  usernameInput = document.getElementById("nick");
  chatIDInput = document.getElementById("kanal");
  messageInput = document.getElementById("czat");
  chatRoom = document.getElementById("RoomID");
  dingSound = document.getElementById("Ding");

  socket.on("dolacz", function(room){
    chatRoom.innerHTML = "Kanał: " + room;
  })

  socket.on("odbior", function(message){
    console.log(message);
    if (messages.length < 11){
      messages.push(message);
      dingSound.currentTime = 0;
      dingSound.play();
    }
    else{
      messages.shift();
      messages.push(message);
    }
    for (i = 0; i < messages.length; i++){
        document.getElementById("wiadomosc"+i).innerHTML = messages[i];
        document.getElementById("wiadomosc"+i).style.color = "#303030";
    }
  })
}

function polacz(){
  socket.emit("dolacz", chatIDInput.value, usernameInput.value);
}

function wyslij(){
  if (delay && messageInput.value.replace(/\s/g, "") != ""){
    delay = false;
    setTimeout(delayReset, 1000);
    socket.emit("wyslij", messageInput.value);
    messageInput.value = "";
  }
}

function delayReset(){
  delay = true;
}