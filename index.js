var app = require('express')();
var http = require('http').Server(app);

app.get('/', function(req, res){
  res.send('<h2>Hello world!</h2>');
});

http.listen(8080, function(){
  console.log('listening on port 8080');
});
