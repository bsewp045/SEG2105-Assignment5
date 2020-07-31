// Inspired from https://github.com/bradtraversy/chatcord.git
//get the form element from chat.html
const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const allUsers = document.getElementById('users');
//get the username and chatroom from URL
const {username, room} = Qs.parse(location.search , {ignoreQueryPrefix: true});

const socket = io();


//Join chatroom functioanlity
//emit event called join room
socket.emit('joinRoom', {username, room});

//Display room and users
socket.on('roomUser', ({room, users}) => {
    outputRoom(room);
    outputUser(users);
})

//client socket listens for messages from the server
socket.on('message' , data => {
    console.log(data);
    output(data);

    //Scroll to the bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;

})

//create an event listener for chatForm, i.e., whenever a user sends data through the chat
//listen for 'submit' event from users
chatForm.addEventListener('submit', (e) => {
    //prevents page from refreshing when user clicks on submit button 
    e.preventDefault();

    //get message from user
    const userMsg = e.target.elements.msg.value;
    console.log(userMsg);

    //sends the message input by the user to the server
    socket.emit('chatMessage' , userMsg);

    //Once the message is sent to the server, the user input is cleared
    e.target.elements.msg.value='';

    //focus on the input bar
    e.target.elements.msg.focus();



})
 
//The client outputs the message received from server
function output(data){
    const divMessage = document.createElement('div');
    divMessage.classList.add('message');
    divMessage.innerHTML = `<p class ="meta">${data.username}<span> ${data.time}</span></p>
                            <p class="text">${data.text}</p>`;
    document.querySelector('.chat-messages').appendChild(divMessage); 
}
 //output all the users in the room
function outputUser(users){
allUsers.innerHTML = `${users.map(user => `<li>${user.username}</li>`).join('')} `;


}
 //output room name
 function outputRoom(room){
     roomName.innerText =  room;
    
 }
