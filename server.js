var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var runner = require("child_process");

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('call api', function(msg){
	var params = {"name":"juan", "age":"35", "sleep":"15"};
	
	io.emit('call api', 'enviado');
	callAPI ("/api/sayHi/", params);
	
	params = {"name":"jose", "age":"25", "sleep":"5"};
	callAPI ("/api/sayHi/", params);
	
	io.emit('call api', 'stand by');
  });
});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});

/* call api method*/

function callAPI (method, params){
	var phpScriptPath = "php/index.php";
	io.emit('call api', 'recibido');		
	runner.exec("php " + phpScriptPath + " " + method+" -p:"+ JSON.stringify(params), function(err, phpResponse, stderr) {
	 if(err) {
		 console.log(err); 
	 }
	 io.emit('call api', phpResponse);
	});
}

