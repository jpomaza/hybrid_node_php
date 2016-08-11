var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser  = require("body-parser");
var methodOverride = require("method-override");
var io = require('socket.io')(http);
var router = express.Router();
var testCtrl = require('./controllers/test');

app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  
app.use(methodOverride());
app.use(router);
/*to make it persistent in test.js*/
app.set('io',io);
app.set('env',app.settings.env);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('call api', function(msg){
	var wait =  Math.floor(Math.random() * 20) + 1  ;  
	var params = {body:{
		  "msg": msg,
		  "wait": wait,
		  "app": app
		}};
	//hardocded call to the api endpoint		
	io.emit('call api', 'mensaje a enviar => msg:'+msg+' || wait: '+wait+'');
	testCtrl.setMessage(params);
	io.emit('call api', 'enviado');

  });
});



/* api routes*/
var test = express.Router();

test.route('/test/addMsg/')  
	.post(testCtrl.setMessage);

test.route('/test/removeMsg/:id')  
	.delete(testCtrl.removeMessage);


test.route('/test/showMsg/')  
	.post(testCtrl.showMessage)
	.put(testCtrl.showMessage);

app.use('/api', test); 

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on *:3000');
});





