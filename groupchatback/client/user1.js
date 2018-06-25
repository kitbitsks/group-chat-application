// connecting with sockets.
const socket = io('http://localhost:3000');

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IkJKQVFiSWlSZiIsImlhdCI6MTUyNjU4MzU4OTc3NSwiZXhwIjoxNTI2NjY5OTg5LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7Im1vYmlsZU51bWJlciI6ODA4ODIyODY3NywiZW1haWwiOiJzb3VyYXZzaXJ2YXN0YXZhMDI3QGdtYWlsLmNvbSIsImxhc3ROYW1lIjoiS3VtYXIiLCJmaXJzdE5hbWUiOiJTb3VyYXYiLCJ1c2VySWQiOiJyMWNjd3BxUmYifX0.eJEXbQi5cbbxYaCWpsSEFFNeQFIcM3VVs7ebspCiRn0"
const userId = "r1ccwpqRf"

let chatMessage = {
  createdOn: Date.now(),
  receiverId: 'HyZDQNdRz',//putting user2's id here 
  receiverName: "Shubham Singh",
  senderId: userId,
  senderName: "Sourav Kumar"
}

let chatSocket = () => {
  let roomName ="edchatting"

  socket.on('verifyUser', (data) => {

    console.log("socket trying to verify user");

    socket.emit("set-user", authToken);

  });

  socket.on(userId, (data) => {

    console.log("you received a message from "+data.senderName)
    console.log(data.message)

  });

  socket.emit('create-room',roomName);
  socket.on("online-user-list", (data) => {

    console.log("Online user list is updated. some user can online or went offline")
    console.log(data)
  });
socket.on('roomsare',(data)=>{
  console.log('onlineroomList is updated')
  console.log(data)
});
  socket.on("typing", (data) => {

    console.log(data+" is typing")
    
    
  });

  $("#send").on('click', function () {

    let messageText = $("#messageToSend").val()
    chatMessage.message = messageText;
    socket.emit("chat-msg",chatMessage)

  })

  $("#messageToSend").on('keypress', function () {
    socket.emit("typing","Sourav Kumar")
  })


}// end chat socket function

chatSocket();
