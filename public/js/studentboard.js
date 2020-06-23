var apiKey = "46803054";

// sets the config of the board
var config = {
    draggable: true,
    position: 'start',
    onDrop: onDrop,
  
    
  
  }
//intalizes the board witht he name myboard
var board = Chessboard('studentBoard', config)


var roomList = ['2_MX40NjgwMzA1NH5-MTU5Mjc4NzAzMDc4NH5mQTFiRlArVUk2d2xPQmVhY01vdHJaOG9-fg','2_MX40NjgwMzA1NH5-MTU5MjkzOTY3OTQ5N355Tmt4WVpEbHVocEx4RGowQUEwVG93ZXh-fg', '1_MX40NjgwMzA1NH5-MTU5Mjk0MDAwMDUyNX5FOXM1QWpXSzhlWGw4VGpLNSt0d0FBcnN-fg','1_MX40NjgwMzA1NH5-MTU5Mjk0MDAzNDAwNX5EbUVVd3VvNlQxdkVMaDYycVRGOURsV2l-fg','2_MX40NjgwMzA1NH5-MTU5Mjk0MDEyMTEyOX5OSzRsUVV5L1pLVE4yaktiQnoydisxTEd-fg'];
var sessionId = '';
var token = '';
function getRoom() { 
  
  var room = document.getElementById("roomName").value;
  sessionId = room;
  token = getToken(sessionId);
  return room;
  
}

function getToken(id) { 
  var tokenList = ['T1==cGFydG5lcl9pZD00NjgwMzA1NCZzaWc9MjdkMWNkY2YwZWZlYjg1Nzk5Y2Q0MzA1ZmZhNjQ1NjQ4NTlhOGMwODpzZXNzaW9uX2lkPTJfTVg0ME5qZ3dNekExTkg1LU1UVTVNamM0TnpBek1EYzROSDVtUVRGaVJsQXJWVWsyZDJ4UFFtVmhZMDF2ZEhKYU9HOS1mZyZjcmVhdGVfdGltZT0xNTkyNzg3NTE1Jm5vbmNlPTAuNTE0NzUzNjQwNDE3NDE4OSZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTk1Mzc5NTE0JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9','T1==cGFydG5lcl9pZD00NjgwMzA1NCZzaWc9OGM3YmJjZWViZTlkOWI2OWVkNmRiNTA4ZjA0MTk2MzhkMWQxOTNiMzpzZXNzaW9uX2lkPTJfTVg0ME5qZ3dNekExTkg1LU1UVTVNamt6T1RZM09UUTVOMzU1VG10NFdWcEViSFZvY0V4NFJHb3dRVUV3Vkc5M1pYaC1mZyZjcmVhdGVfdGltZT0xNTkyOTM5ODYxJm5vbmNlPTAuNzAzMDY3MjA4NzczOTIzOCZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTk1NTMxODYxJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9','T1==cGFydG5lcl9pZD00NjgwMzA1NCZzaWc9NDRiODFjMTg5Y2ZlMjk4MGFhZWQ1ZTNjZjM4ZGEwMTBiNGE1YjJhYzpzZXNzaW9uX2lkPTFfTVg0ME5qZ3dNekExTkg1LU1UVTVNamswTURBd01EVXlOWDVGT1hNMVFXcFhTemhsV0d3NFZHcExOU3QwZDBGQmNuTi1mZyZjcmVhdGVfdGltZT0xNTkyOTQwMDIwJm5vbmNlPTAuMjkzNTk5MTE2MTM3ODEzNTMmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTU5NTUzMjAxOSZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==','T1==cGFydG5lcl9pZD00NjgwMzA1NCZzaWc9MzE3MTVlMDUyNTI0YzQ3NjVkZjdiZTgwMjgzMzFlYTAwNGQ4ZGM2NjpzZXNzaW9uX2lkPTFfTVg0ME5qZ3dNekExTkg1LU1UVTVNamswTURBek5EQXdOWDVFYlVWVmQzVnZObFF4ZGtWTWFEWXljVlJHT1VSc1YybC1mZyZjcmVhdGVfdGltZT0xNTkyOTQwMDQ4Jm5vbmNlPTAuOTkwNjk1MTU1NTc3MjQ1OSZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTk1NTMyMDQ3JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9','T1==cGFydG5lcl9pZD00NjgwMzA1NCZzaWc9Y2NmMmQ0Y2RjYTkyZGVjY2QyZTJmMDdmMTBmYjNmZTY3M2Y0YjJiNjpzZXNzaW9uX2lkPTJfTVg0ME5qZ3dNekExTkg1LU1UVTVNamswTURFeU1URXlPWDVPU3pSc1VWVjVMMXBMVkU0eWFrdGlRbm95ZGlzeFRFZC1mZyZjcmVhdGVfdGltZT0xNTkyOTQwMTUwJm5vbmNlPTAuNTI5NTc1MTczNjg2MDAyNCZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNTk1NTMyMTUwJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9'];
  var tokenIndex = parseInt(roomList.indexOf(id));
  var token = tokenList[tokenIndex];
  
  return token;
}
clicked = false; 

function joinRoom() { 
  room = getRoom();
  console.log(room);
  socket.emit('join_room', room);
  var myobj = document.getElementById("roomName");
  myobj.remove();
  var myobj2 = document.getElementById("join");
  myobj2.remove();
  initializeSession();
  
}

socket.on("move_made", move => {
  
  board.position(move);
});


function onDrop (source, target, piece, newPos, oldPos, orientation) {
  move = Chessboard.objToFen(newPos);
  socket.emit("move_made", {room, move});
}




// Handling all of our errors here by alerting them
function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

// (optional) add server code here


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
