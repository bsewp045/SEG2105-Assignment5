// use an array to keep track of all the users in a room
const users = [];

//Join a user to chat

function userJoin(id, username, room){
    const user = {id, username, room};
    users.push(user);
    return user;
}

//get a user

function getUser(id){
    return users.find(user => user.id === id);
}

//A user leaves the chat
function userLeft(id){
    const i = users.findIndex(user => user.id === id);
    if ( i !== -1){
        return users.splice(i, 1)[0];        
    }
}

//get all participants in a room
function getRoom(room){
    return users.filter(user => user.room === room);
}

module.exports = {
    userJoin,
    getUser,
    getRoom,
    userLeft
};