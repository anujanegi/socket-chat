var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  console.log("-------------------------A user connected-------------------------");
  socket.on('disconnect', function () {
    console.log('-------------------------A user disconnected-------------------------');
  });
  socket.on('chat message', function (msg) {
    console.log('Message:' + msg);
  });
});

http.listen(8080, function(){
  console.log('listening on port 8080');
});
