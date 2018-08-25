// server.js
// where your node app starts
// init project
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var helmet = require('helmet');
require('dotenv').config();
var PORT = process.env.PORT || 8080;
// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(helmet());
app.use(helmet.noCache());
//https://enable-cors.org/server_expressjs.html
app.use(function(req, res, next) {
    //deal with img-src access and other for dev builds.
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
//app.use(Gun.serve);
app.use(bodyParser.urlencoded({ extended: true }));
// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));
//https://cdn.glitch.com/94ca57e3-7116-4770-8a69-e0034c332f65%2Felement-icons.ttf?1525640363315
//https://cdn.glitch.com/94ca57e3-7116-4770-8a69-e0034c332f65%2Felement-icons.woff?1525640368138
//assets redirect
app.get("/fonts/element-icons.woff", function (request, response) {
  response.redirect("https://cdn.glitch.com/94ca57e3-7116-4770-8a69-e0034c332f65%2Felement-icons.woff?1525640368138");
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  //response.sendFile(__dirname + '/views/index.html');
  response.render('index');
});

// listen for requests :)
var listener = app.listen(PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
  //http://localhost:3000/
  //console.log(listener.address());
});
//===============================================
// WebSocket
//===============================================
//var WebSocket = require('ws');
//var websocketServer = new WebSocket.Server;
var WebSocketServer = require('ws').Server,
  wss = new WebSocketServer({server: listener})

wss.on('connection', function (ws) {
  console.log("connect!");
  //ws.on('open', function() {
    //console.log('open')
  //});

  ws.on('message', function (message) {
    //console.log('received: %s', message)
    console.log(message)
  })

  ws.on('error', function (message) {
    console.log('error: %s', message)
  })

  ws.on('close', function (message) {
    console.log('close: %s', message)
  })
  //godot 3 send test work time stamp worked.
  //setInterval(
    //() => ws.send(`${new Date()}`),
    //1000
  //)
})

//wss.on('close', function close() {
  //console.log('disconnected');
//});
//===============================================
// Socket.io
//===============================================
var io = require('socket.io')(listener);

io.on('connection', function(client) {
  console.log('Client connected...');
  
  client.on('chat message', function(msg){
    //console.log('message: ' + msg);
    io.emit('chat message', msg);
    //botcmds.parsecmds(client,msg);
  });
});