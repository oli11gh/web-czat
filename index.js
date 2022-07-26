const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const path = require("path");

const app = express();
const httpserver = http.Server(app);
const io = socketio(httpserver);

const gamedirectory = path.join(__dirname, "html");

app.use(express.static(gamedirectory));

httpserver.listen(3000);

var rooms = [];
var usernames = [];

io.on('connection', function(socket){

  socket.on("dolacz", function(room, username){
    if (username != ""){
      rooms[socket.id] = room;
      usernames[socket.id] = username;
      socket.leaveAll();
      socket.join(room);
      io.in(room).emit("odbior", "Serwer : " + username + " Dołączył do czatu.");
      socket.emit("dolacz", room);
    }
  })

  socket.on("wyslij", function(message){
    io.in(rooms[socket.id]).emit("odbior", usernames[socket.id] +" : " + message);
  })

  socket.on("odbior", function(message){
    socket.emit("odbior", message);
  })
})
