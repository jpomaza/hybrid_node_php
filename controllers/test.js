
//POST - add message
exports.setMessage = function(req, res) {  
	
    console.log(req.body.msg);
    console.log(req.body.wait);
    
    //PHP api call
    var options = {  
              method: 'PUT',
              uri: 'http://local.apiphp.dev/api/setMessage',
              headers: {
                      	'Content-Type': 'application/json; charset=utf-8',
                      	'Content-Length': req.body.length
                		},
              body: {
                    msg: req.body.msg,
                    wait: req.body.wait,
              },
              json: true
            }
    var request = require('request-promise');
    var io = req.body.app.settings.io;
    
    request(options)  
      .then(function (response) {
        // Handle the response    
    	io.emit('call api', response.message);    	  
        console.log(response);
      })
      .catch(function (err) {
        // Deal with the error
          console.log('error');
      });

     if(res === undefined) {
    	 return null;
     }
     
     res.status(200).jsonp('Mensaje enviado a API php');

};

//GET - get message
exports.getMessage = function(req, res) {  
    console.log('GET /test');
    res.status(200).jsonp('Mensaje recibido de API PHP');

};

//POST - show message
exports.showMessage = function(req, res) {           
    console.log('POST /test/show message');
    var io = req.app.settings.io;
    io.emit('call api', req.body.msg);
    console.log(req.body.msg);
    res.status(200).jsonp('gracias por tu mensaje API PHP! (de nodeAPI)');

};

//DELETE - delete message
exports.removeMessage = function(req, res) {  
    console.log('DELETE /test');
     res.status(200).jsonp('borrado');

};