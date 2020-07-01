togglePopup();


var apiKey = "46803054";

// sets the config of the board
var config = {
  draggable: true,
  position: 'start',
  sparePieces: true,
  dropOffBoard: 'trash',
  onDrop: onDrop,

}
var audio = new Audio('move.mp3');

//intalizes the board witht he name myboard
var board = Chessboard('myBoard', config)

var temp = [];
// adds functionality to the buttons 
$('#clearboard').on('click', board.clear)
$('#startpos').on('click', board.start)
$('#flipboard').on('click', board.flip)
$('#undomove').on('click', function () {
  temp.push(board.fen());
  audio.play();
  console.log("mek", temp);
  var x = moveHistory.length;
  var x = x - 1; 
  board.position(moveHistory[x]);
  moveHistory.pop();
  
  move = Chessboard.objToFen(board.position());
  
  socket.emit("move_made", {room, move});
  console.log('undo move finished');
})
//records the board states
var moveHistory= [];



function onDrop (source, target, piece, newPos, oldPos, orientation) {
  //adds the most recent move to the move list
  audio.play();
  moveHistory.push(board.fen());
  move = Chessboard.objToFen(newPos);
  console.log("the move the tutor sent:", move);
  socket.emit("move_made", {room, move});
}
socket.on("move_made", move => {
  moveHistory.push(board.fen());
  board.position(move);
  
  console.log(moveHistory);
});



function getToken(id) { 
  var tokenList = ['T1==cGFydG5lcl9pZD00NjgwMzA1NCZzaWc9MjdkMWNkY2YwZWZlYjg1Nzk5Y2Q0MzA1ZmZhNjQ1NjQ4NTlhOGMwODpzZXNzaW9uX2lkPTJfTVg0ME5qZ3dNekExTkg1LU1UVTVNamM0TnpBek1EYzROSDVtUVRGaVJsQXJWVWsyZDJ4UFFtVmhZMDF2ZEhKYU9HOS1mZyZjcmVhdGVfdGltZT0xNTkyNzg3NTE1Jm5vbmNlPTAuNTE0NzUzNjQwNDE3NDE4OSZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTk1Mzc5NTE0JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9','T1==cGFydG5lcl9pZD00NjgwMzA1NCZzaWc9OGM3YmJjZWViZTlkOWI2OWVkNmRiNTA4ZjA0MTk2MzhkMWQxOTNiMzpzZXNzaW9uX2lkPTJfTVg0ME5qZ3dNekExTkg1LU1UVTVNamt6T1RZM09UUTVOMzU1VG10NFdWcEViSFZvY0V4NFJHb3dRVUV3Vkc5M1pYaC1mZyZjcmVhdGVfdGltZT0xNTkyOTM5ODYxJm5vbmNlPTAuNzAzMDY3MjA4NzczOTIzOCZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTk1NTMxODYxJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9','T1==cGFydG5lcl9pZD00NjgwMzA1NCZzaWc9NDRiODFjMTg5Y2ZlMjk4MGFhZWQ1ZTNjZjM4ZGEwMTBiNGE1YjJhYzpzZXNzaW9uX2lkPTFfTVg0ME5qZ3dNekExTkg1LU1UVTVNamswTURBd01EVXlOWDVGT1hNMVFXcFhTemhsV0d3NFZHcExOU3QwZDBGQmNuTi1mZyZjcmVhdGVfdGltZT0xNTkyOTQwMDIwJm5vbmNlPTAuMjkzNTk5MTE2MTM3ODEzNTMmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTU5NTUzMjAxOSZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==','T1==cGFydG5lcl9pZD00NjgwMzA1NCZzaWc9MzE3MTVlMDUyNTI0YzQ3NjVkZjdiZTgwMjgzMzFlYTAwNGQ4ZGM2NjpzZXNzaW9uX2lkPTFfTVg0ME5qZ3dNekExTkg1LU1UVTVNamswTURBek5EQXdOWDVFYlVWVmQzVnZObFF4ZGtWTWFEWXljVlJHT1VSc1YybC1mZyZjcmVhdGVfdGltZT0xNTkyOTQwMDQ4Jm5vbmNlPTAuOTkwNjk1MTU1NTc3MjQ1OSZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTk1NTMyMDQ3JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9','T1==cGFydG5lcl9pZD00NjgwMzA1NCZzaWc9Y2NmMmQ0Y2RjYTkyZGVjY2QyZTJmMDdmMTBmYjNmZTY3M2Y0YjJiNjpzZXNzaW9uX2lkPTJfTVg0ME5qZ3dNekExTkg1LU1UVTVNamswTURFeU1URXlPWDVPU3pSc1VWVjVMMXBMVkU0eWFrdGlRbm95ZGlzeFRFZC1mZyZjcmVhdGVfdGltZT0xNTkyOTQwMTUwJm5vbmNlPTAuNTI5NTc1MTczNjg2MDAyNCZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTk1NTMyMTUwJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9'];
  var tokenIndex = parseInt(roomList.indexOf(id));
  var token = tokenList[tokenIndex];
  return token;
}



var roomList = ['2_MX40NjgwMzA1NH5-MTU5Mjc4NzAzMDc4NH5mQTFiRlArVUk2d2xPQmVhY01vdHJaOG9-fg','2_MX40NjgwMzA1NH5-MTU5MjkzOTY3OTQ5N355Tmt4WVpEbHVocEx4RGowQUEwVG93ZXh-fg', '1_MX40NjgwMzA1NH5-MTU5Mjk0MDAwMDUyNX5FOXM1QWpXSzhlWGw4VGpLNSt0d0FBcnN-fg','1_MX40NjgwMzA1NH5-MTU5Mjk0MDAzNDAwNX5EbUVVd3VvNlQxdkVMaDYycVRGOURsV2l-fg','2_MX40NjgwMzA1NH5-MTU5Mjk0MDEyMTEyOX5OSzRsUVV5L1pLVE4yaktiQnoydisxTEd-fg'];
var room = roomList[Math.floor(Math.random()*roomList.length)];
var sessionId = room;
var token = getToken(sessionId);



function startRoom() { 
  socket.emit('join_room', room);
  initializeSession();
  var element = document.getElementById('megadodoo');
  element.parentNode.removeChild(element);
  document.getElementById('codeGoesHere').value = room;
  

  
}

function copyCode() {
  var copyText = document.getElementById("roomName");
  copyText.select();
  copyText.setSelectionRange(0, 99999); 
  document.execCommand("copy");
  togglePopup();
}

// Handling all of our errors here by alerting them
function handleError(error) {
  if (error) {
    alert(error.message);
  }
}




function initializeSession() {
  var session = OT.initSession(apiKey, sessionId);

  // Subscribe to a newly created stream
  session.on('streamCreated', function(event) {
    session.subscribe(event.stream, 'subscriber', {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    }, handleError);
  });

  // Create a publisher
  var publisher = OT.initPublisher('publisher', {
    insertMode: 'append',
    width: '100%',
    height: '100%'
  }, handleError);

  // Connect to the session
  session.connect(token, function(error) {
    // If the connection is successful, initialize a publisher and publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
    }
  });
  
}

function sendMessage() { 
  var msg = document.getElementById('clientMsg').value;
  
  document.getElementById('chatElement').innerHTML += "<div class='contain'> <p>" +' ' + msg + "</p></div>";
  socket.emit("incomingMessage", {room, msg});

  
}

socket.on('messageReceived', msg => { 
  document.getElementById('chatElement').innerHTML += "<div class='contain darker'> <p>" +' ' + msg + "</p></div>";

});

function togglePopup(){
  document.getElementById("popup-1").classList.toggle("active");
}
function copy() {
  /* Get the text field */
  var copyText = document.getElementById("codeGoesHere");

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /*For mobile devices*/

  /* Copy the text inside the text field */
  document.execCommand("copy");

  /* Alert the copied text */
}

function setPos() { 
  var move = document.getElementById('fen').value;
  console.log(move);
  board.position(move);
  socket.emit("move_made", {room, move});

}

window.addEventListener('resize', function(event){

  window.location.reload(false); 
});

function redoMove(){
  audio.play();
  tempIndex = temp.length - 1;
  board.position(temp[tempIndex]);
  temp.pop();

}

function getCurrentPos(){ 
  tempIndex = temp.length-1;
  return board.fen(temp[tempIndex]);

}