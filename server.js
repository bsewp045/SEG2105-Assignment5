const express = require('express');
const path = require('path');
const http = require('http');
const app = express();
const socketio = require('socket.io');
const formatMessage = require('./format/formatUserInput');
const {userJoin, getUser, userLeft, getRoom}= require('./format/roomFunctionality');
// Create a server
const server = http.createServer(app);
//Create a socket through which the server listens
const io = socketio(server);

//static folder
app.use(express.static(path.join(__dirname, 'other')));

//Server listens for user connections
io.on('connection', (socket) => {

    socket.on('joinRoom' , ({username,room}) => {

        const user = userJoin(socket.id, username, room);
        socket.join(user.room);


        //whenever a user connects, the server sends out a welcome message
    socket.emit("message" , formatMessage('SimpleChat' , "Welcome to Simple Chat"));


    //Whenever a user connects, all other users get a notification except the user that is connecting
    socket.broadcast.to(user.room).emit('message' , formatMessage('SimpleChat',`${user.username} has joined the chatroom`));

    // update the users' names on the website
    io.to(user.room).emit('roomUser' , {
        room : user.room,
        users: getRoom(user.room)
    });
    })
    
    

    //Whenever a user disconnects, all other users get a notification
    socket.on('disconnect' , () => {
        const user = userLeft(socket.id);
        //sends disconnect message to all users
        if(user){
            io.to(user.room).emit('message' , formatMessage('SimpleChat',`${user.username} has left the chatroom`));

            io.to(user.room).emit('roomUser' , {
                room : user.room,
                users: getRoom(user.room)
            });
        }


        //update the users' names on the website
        
        
        
    })

    //server listens for chat messages from the user
    socket.on('chatMessage' , userMsg => {
        const user = getUser(socket.id);

        //when server receives a message from a user, it broadcasts it to all other users
        io.to(user.room).emit('message', formatMessage( `${user.username}`, userMsg));    

    })


})


const PORT = process.env.PORT || 5555;

server.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));

