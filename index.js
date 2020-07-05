
var express = require('express');
var fs = require( 'fs' );
var app = require('express')();
var https  = require('https');
var server = https.createServer({ 
  key: fs.readFileSync('/etc/letsencrypt/live/chesscall.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/chesscall.com/cert.pem') 
},app);
server.listen(3000);

var io = require('socket.io').listen(server);
app.use(express.static('public'));
/*
var privateKey = fs.readFileSync('/etc/letsencrypt/live/chesscall.com/privkey.pem').toString();
var certificate = fs.readFileSync('/etc/letsencrypt/live/chesscall.com/cert.pem').toString();
var ca = fs.readFileSync('/etc/letsencrypt/live/chesscall.com/chain.pem').toString();
*/
/*
const privateKey = fs.readFileSync('/etc/letsencrypt/live/chesscall.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/chesscall.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/chesscall.com/chain.pem', 'utf8');
const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};
*/

//app.use(express.static(__dirname + '/public'));
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
    console.log("I sent the legal move to", room)
  });
  socket.on("incomingMessage", ({room, msg}) => {
    
    console.log("A message was received", msg);
    
    socket.to(room).emit("messageReceived", msg);
  });
  socket.on("game_started", ({room, time, color}) => {
    console.log('a game was started');
    console.log(color);
    socket.to(room).emit("game_started", {time, color});
  });
  socket.on("legal_move", ({move, board, room}) => {
    console.log('the legal move sent was', move);
    console.log('I sent a legal move lmao');
    socket.to(room).emit("legal_move", (move));
  });
  socket.on("editor", (room) => {
    console.log('the editor listener fired')
    socket.to(room).emit("editor", (room));
  });





});



/*
// const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);
/*
httpServer.listen(90, () => {
	console.log('HTTP Server running on port 80');
});
*/
/*
https.listen(3000, () => {
	console.log('HTTPS Server running on port 3000');
});
*/