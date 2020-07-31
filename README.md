# SEG_Assignment5
Simple Real Time Chat


Requirements:

1. Create a simple real time chat app for engineering students at uottawa.
2. Students should enter the chat by using a URL (web-based chat).
3. Students should be able to choose a chat room and a username.
4. Once they entered the chat room, they should be be able to communicate with each other
   by sending text messages.
5. It should be clear who is sending the message and at what time.
6. Users should get a message on their screen whenever another user connects or disconnects.
7. Users should be able to view all the users currently on the chatroom.
8. Users should be able to exit the chatroom by clicking an exit button, which leads them
   back to the welcome page.


Dependencies to run the project:

1. Install node.js
2. Run the command : npm install 
3. Run the command: nodemon run devStart


Type http://localhost:5555 on a browser to access the chat


Manual Tests to run

Before starting the tests, run the commands above

1. Enter the login page by typing the URL above in your browser.
   Choose a chatroom and a username.

   You should see your username added at the top.
   You should get a message from SimpleChat(with the time besides it): "Welcome to Simple Chat"

2. Enter the login page.
   Choose a chatroom and the username: Jane.
   Enter the login page again in a separate tab, selecting the same chatroom but a different username : Paul.

   In the first instance, you should see the same result as in Test1 and also : "Paul has joined the chatroom"

3. Enter the login page.
   Choose a chatroom and the username: Jane.
   Enter the login page again in a separate tab, selecting the same chatroom but a different username : Paul.
   Then in Paul's window, click on exit.

   In the first instance, you should see the same result as in Test2 and also : "Paul has left the chatroom"
   Also, the name "Paul" will no longer appear on the list of users.

4. Enter the login page.
   Choose a chatroom and a username.
   Enter the login page again in a separate tab, but select a different chatroom.
   
   In the first instance, you should not get any notifications about someone joining the chatroom

5. Enter the login page.
   Choose a chatroom and a username.
   Enter the login page again in a separate tab, but select a different chatroom.
   Then exit this chatroom.
   
   In the first instance, you should not get any notifications about someone leaving the chatroom.

6. Enter the login page.
   Choose a chatroom and a username: Jane.
   Enter the login page again in a separate tab, selecting the same chatroom and username : Sara.
   Enter the login page again in a separe tab, selecting a different chatroom and username: Belle.
   Send a message from Sara's window. The message should be broadcasted to Jane's window but not to Belle's.

