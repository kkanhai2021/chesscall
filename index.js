var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var PORT = process.env.PORT || 3000;





app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
  

});

app.get('/tutorboard.html', (req, res) => {
  res.sendFile(__dirname + '/public/tutorboard.html');
  
});

app.get('/studentboard.html', (req, res) => {
  res.sendFile(__dirname + '/public/studentboard.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  
  // when a user creates a room, it subscribes their socket to that room
  socket.on("join_room", room => {
    console.log("socket joined: ", room);
    socket.emit('your_room', room);
    socket.join(room);
  });
  
  //whenever a client makes a move, it emits that move to all clients in the room, except the sender
  socket.on("move_made", ({room, move}) => {
    
    console.log("A move was sent to:", room);
    console.log("the move the server received was", move);
    socket.to(room).emit("move_made", move);
  });
  socket.on("incomingMessage", ({room, msg}) => {
    
    console.log("A message was received", msg);
    
    socket.to(room).emit("messageReceived", msg);
  });
});
 
http.listen(PORT, () => {
  console.log('listening on port: 3000');
});




