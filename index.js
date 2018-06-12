var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
//var mysql = require('mysql')
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'nodedb',
//   password : 'nodedb',
//   database : 'nodedb'
// });

// connection.connect();

// connection.query('SELECT * FROM users', function (err, rows, fields) {
//   if (err) throw err

//   console.log('The user name from table users (mysql db): ', rows[0].uname)
// });

// connection.end();


app.get('/', function(req, res){
  res.sendFile(__dirname + '/login.html');
});

app.get('/chat', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

io.on('connection', function(socket){
  socket.on('entry message', function(msg){
    socket.broadcast.emit('entry message', msg);
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});


io.on('connection', function(socket){
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});