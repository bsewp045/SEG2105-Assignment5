const socket = io();

//get the form element from chat.html
const chatForm = document.getElementById('chat-form');

//client socket listens for messages from the server
socket.on('message' , data => {
    console.log(data);
    output(data);
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


})

//The client outputs the message received from server
function output(data){
    const divMessage = document.createElement('div');
    divMessage.classList.add('message');
    divMessage.innerHTML = `<p class ="meta">Random User<span> Random Time</span></p>
                            <p class="text">${data}</p>`;
    document.querySelector('.chat-messages').appendChild(divMessage); 
}

