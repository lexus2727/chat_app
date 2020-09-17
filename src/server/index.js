let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

const express = require('express');


app.get('/', (req, res) => res.send('Hello World!'));

io.on('connection', (socket) => {
    console.log('User connected');
   
    socket.on('chat message:', function(msg) {
        console.log('message:  ' + JSON.stringify(msg));
        io.emit('chat message', msg);
    }
);

// Start the Express server
http.listen(3001, () => console.log('Server running on port 3001!'));

})

