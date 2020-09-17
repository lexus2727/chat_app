let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

const express = require('express')

// Create Express app
//const app = express()

// A sample route
app.get('/', (req, res) => res.send('Hello World!'))

io.on('connection', (socket) => {
    console.log('User connected');
   
    socket.on('chat message:', function(msg) {
        console.log('message:  ' + JSON.stringify(msg));
        io.emit('chat message', msg);
    }
);

// Start the Express server
http.listen(3001, () => console.log('Server running on port 3001!'))








//const express = require('express')


// Create Express app
//const app = express()

// A sample route
//app.get('/', (req, res) => res.send('Hello World!'))

//server connection
//io.on('connection', (socket) => {
    //console.log('User connected');
    
 //io.emit('text', 'Hello, World!');


// Start the Express server
//app.listen(3000, () => console.log('Server running on port 3000