var app = require('express');
var https = require('https');
var io = require('socket.io')(https);



const fs = require('fs');
var PORT = process.env.PORT || 3000;


const privateKey = fs.readFileSync('/etc/letsencrypt/live/chesscall.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/chesscall.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/chesscall.com/chain.pem', 'utf8');
const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

// app.use(express.static(__dirname + '/public'));
express.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
  

});

express.get('/tutorboard.html', (req, res) => {
  res.sendFile(__dirname + '/public/tutorboard.html');
  
});

express.get('/studentboard.html', (req, res) => {
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
 
// const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);
/*
httpServer.listen(90, () => {
	console.log('HTTP Server running on port 80');
});
*/
https.listen(3000, () => {
	console.log('HTTPS Server running on port 3000');
});