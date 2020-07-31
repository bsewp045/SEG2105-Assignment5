//Author : Brad Traversy
//https://github.com/bradtraversy/chatcord.git
const moment = require('moment');

function formatMessage(username, text){
    return{
        username,
        text,
        time: moment().format('h:mm a')
    }

}

module.exports = formatMessage;