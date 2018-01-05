var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var users = [];
var c = 1;

function getUserList(){
  var userList = [];
  for (var i=0; i < users.length; i++)
    userList[i] = users[i];
  return userList;
}

function setUserTyping(n){
  var userList = [];
    for (var i = 0; i < users.length; i++)
      userList[i] = users[i];
  userList[n] = "typing... " + users[n];
  return userList;
}

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function (socket) {
  users.push(socket);
  console.log("-------------------------A user connected-------------------------");
  socket.on('disconnect', function () {
    console.log('-------------------------A user disconnected-------------------------');
  });
  socket.on('start', function(){
    socket.emit('name', "guest"+c);
    users[users.indexOf(socket)] = "guest"+c;
    c++;
    io.emit('user list', getUserList());
  });
  socket.on('chat message', function (msg) {
    io.emit('chat message', msg);
  });
  socket.on('set name', function(name){
    io.emit('info', "New user: " + name);
    users[users.indexOf(socket)] = name;
    io.emit('user list', getUserList());
  });

  socket.on('typing', function(){
    io.emit('typing signal', setUserTyping(users.indexOf(socket)));
  });

  socket.on('not typing', function(){
    io.emit('typing signal', getUserList());
  });
});

http.listen(8080, function(){
  console.log('listening on port 8080');
});
