var apiKey = "46803054";

// sets the config of the board
var config = {
    draggable: true,
    position: 'start',
    onDrop: onDrop,
    orientation: 'black',
    
  
}
//intalizes the board witht he name myboard
var board = Chessboard('myBoard', config)


var roomList = ['2_MX40NjgwMzA1NH5-MTU5Mjc4NzAzMDc4NH5mQTFiRlArVUk2d2xPQmVhY01vdHJaOG9-fg','2_MX40NjgwMzA1NH5-MTU5MjkzOTY3OTQ5N355Tmt4WVpEbHVocEx4RGowQUEwVG93ZXh-fg', '1_MX40NjgwMzA1NH5-MTU5Mjk0MDAwMDUyNX5FOXM1QWpXSzhlWGw4VGpLNSt0d0FBcnN-fg','1_MX40NjgwMzA1NH5-MTU5Mjk0MDAzNDAwNX5EbUVVd3VvNlQxdkVMaDYycVRGOURsV2l-fg','2_MX40NjgwMzA1NH5-MTU5Mjk0MDEyMTEyOX5OSzRsUVV5L1pLVE4yaktiQnoydisxTEd-fg'];
var sessionId = '';
var token = '';
function getRoom() { 
  
  var room = document.getElementById("codeGoesHere").value;
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
  
  initializeSession();
  
}




function onDrop (source, target, piece, newPos, oldPos, orientation) {
  move = Chessboard.objToFen(newPos);
  socket.emit("move_made", {room, move});
}

socket.on("move_made", move => {
  console.log("i received the legal move")
  board.position(move);
  
  
});



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

window.addEventListener('resize', function(event){

  window.location.reload(false); 
});

var modal = new tingle.modal({
  footer: true,
  stickyFooter: false,
  closeMethods: ['overlay','escape'],
  closeLabel: "Close",
  cssClass: ['custom-class-1', 'custom-class-2'],
  onOpen: function() {
      console.log('modal open');
  },
  onClose: function() {
      
      console.log('modal closed');
  },
  beforeClose: function() {
      // here's goes some logic
      // e.g. save content before closing the modal
      return true; // close the modal
      return false; // nothing happens
  }
});

// set content

modal.setContent("<h1 id='popupTitle'>Welcome to Chesscall</h1><input style='width:100%; paddding-right: 10%;' type='text' id='codeGoesHere' class='undomove' placeholder='Paste the code your tutor gave you here.'><div><p class='spacing'>Get started.</p></div>");

// add a button
modal.addFooterBtn('Begin Lesson', 'tingle-btn tingle-btn--primary startBtn', function() {
    joinRoom();
    console.log(room);
    modal.close();
});

// add another button
modal.open();

var helpModal = new tingle.modal({
  footer: false,
  stickyFooter: true,
  closeMethods: ['overlay','escape'],
  closeLabel: "Close",
  cssClass: ['custom-class-1', 'custom-class-2'],
  onOpen: function() {
      console.log('modal open');
  },
  onClose: function() {
      
      console.log('modal closed');
  },
  beforeClose: function() {
      // here's goes some logic
      // e.g. save content before closing the modal
      return true; // close the modal
      return false; // nothing happens
  }
});

//helpModal.addFooterBtn('Back','tingle-btn tingle-btn--danger tingle-btn--pull-right copy', function() {
 // helpModal.close();
  
//});

helpModal.setContent("<h1 class='troubleshooting'>Troubleshooting</h1><h2 class='troubleshooting notice'>Notice:</h2><p class='troubletext'>We apologize for any inconveniances we may have caused you. The small dedicated team at ChessCall will try to resolve these issues as soon as possible. Below you will find a brief guide on fixing some of the most common issues.</p><h2 class='troubleshooting'>Display Issues:</h2> <img src='images/messedUpBoard.png' width='775' height='400' style='border-style: solid; border-color: black;'><p class='troubletext'>Board looking all jumbled? No worries! Just resize the window (try both horizontally and vertically).</p><h2 class='troubleshooting'>Button Issues:</h2><p class='troubletext'>Buttons not working? Try clearing the board and hiting start posistion.</p>");


socket.on("game_started", time => {
  var board = null
  var game = new Chess()
  var $status = $('#status')
  var $fen = $('#fen')
  var $pgn = $('#pgn')
  
  function onDragStart (source, piece, position, orientation) {
    // do not pick up pieces if the game is over
    if (game.game_over()) return false
  
    // only pick up pieces for the side to move
    if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
      return false
    }
  }
  
  function onDrop (source, target) {
    // see if the move is legal
    var move = game.move({
      from: source,
      to: target,
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
    })
  
    // illegal move
    if (move === null) return 'snapback'
  
    updateStatus()
  }
  
  // update the board position after the piece snap
  // for castling, en passant, pawn promotion
  function onSnapEnd () {
    board.position(game.fen())
  }
  
  function updateStatus () {
    var status = ''
  
    var moveColor = 'White'
    if (game.turn() === 'b') {
      moveColor = 'Black'
    }
  
    // checkmate?
    if (game.in_checkmate()) {
      status = 'Game over, ' + moveColor + ' is in checkmate.'
    }
  
    // draw?
    else if (game.in_draw()) {
      status = 'Game over, drawn position'
    }
  
    // game still on
    else {
      status = moveColor + ' to move'
  
      // check?
      if (game.in_check()) {
        status += ', ' + moveColor + ' is in check'
      }
    }
  
    $status.html(status)
    $fen.html(game.fen())
    $pgn.html(game.pgn())
  }
  
  var config = {
    draggable: true,
    position: 'start',
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd
  }
  board = Chessboard('myBoard', config)
  
  updateStatus()

});

socket.on("move", ({move, board}) => {
  game.move(move);
  board.position(game.fen());
  console.log("moved");
 
});