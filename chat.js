var http = require('http');
var fs = require('fs');

var app = http.createServer(function (req, res) {
    fs.readFile('./views/index.html', 'utf-8', function (error, content) {
        res.writeHead(200, {
            "Content-Type": "text/html"
        });
        res.end(content);
    });
});

var io = require('socket.io').listen(app);

io.sockets.on('connection', function (socket) {
    socket.emit('message', 'Vous êtes connecté');
    
    socket.on('petit_nouveau', function(pseudoDuNouveau) {
        socket.broadcast.emit('newConnection', pseudoDuNouveau);
    });

    socket.on('newPost', function (post, pseudo) {
        socket.broadcast.emit('addMessage', post, pseudo);
    });
});

app.listen(8080);