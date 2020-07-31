const express = require('express');
const path = require('path');
const http = require('http');
const app = express();
const socketio = require('socket.io');
const formatMessage = require('./format/formatUserInput');
// Create a server
const server = http.createServer(app);
//Create a socket through which the server listens
const io = socketio(server);

//static folder
app.use(express.static(path.join(__dirname, 'other')));

//Server listens for user connections
io.on('connection', (socket) => {
    
    //whenever a user connects, the server sends out a welcome message
    socket.emit("message" , formatMessage('SimpleChat' , "Welcome to Simple Chat"));


    //Whenever a user connects, all other users get a notification except the user that is connecting
    socket.broadcast.emit('message' , formatMessage('SimpleChat','A new user has joined the chatroom'));

    //Whenever a user disconnects, all other users get a notification
    socket.on('disconnect' , () => {
        //sends disconnect message to all users
        io.emit('message' , formatMessage('SimpleChat','A user has left the chatroom'))
    })

    //server listens for chat messages from the user
    socket.on('chatMessage' , userMsg => {
        //when server receives a message from a user, it broadcasts it to all other users
        io.emit('message', formatMessage( 'Random User', userMsg));    

    })


})


const PORT = process.env.PORT || 5555;

server.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));

