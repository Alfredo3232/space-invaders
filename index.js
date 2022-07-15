var PORT = process.env.PORT || 5500;
var express = require('express');
var app = express();

var http = require('http');
var server = http.Server(app);

app.use(express.static('game'));

server.listen(PORT, function () {
    console.log('server running');
});

console.log(`the server is running on ${PORT}`)