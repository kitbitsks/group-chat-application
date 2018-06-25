// connecting with sockets.
const socket = io('http://localhost:3000');

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IkJrWG1iTGpDZiIsImlhdCI6MTUyNjU4MzU3OTMyMCwiZXhwIjoxNTI2NjY5OTc5LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7Im1vYmlsZU51bWJlciI6OTc0MjgyOTkxOSwiZW1haWwiOiJzaHViaGFtLnNpbmdoNjJAZ21haWwuY29tIiwibGFzdE5hbWUiOiJTaW5naCIsImZpcnN0TmFtZSI6InNoc2hhYSIsInVzZXJJZCI6Ikh5WkRRTmRSeiJ9fQ.a-w76TqPrFVxkTHrITdZtJ7HToI6RmJ_ZVv4BFbHrVE"
const userId= "HyZDQNdRz"

let chatMessage = {
  createdOn: Date.now(),
  receiverId: 'r1ccwpqRf',//putting user2's id here 
  receiverName: "Sourav Srivastava",
  senderId: userId,
  senderName: "Shubham Singh"

}

let chatSocket = () => {
  let roomName = 'edchat'
  socket.on('verifyUser', (data) => {

    console.log("socket trying to verify user");

    socket.emit("set-user", authToken);

  });

  socket.on(userId, (data) => {

    console.log("you received a message from "+data.senderName)
    console.log(data.message)

  });

  socket.emit('create-room',roomName)
  socket.on("online-user-list", (data) => {

    console.log("Online user list is updated. some user can online or went offline")
    console.log(data)

  });

  socket.on('roomsare',(data)=>{
    console.log('onlineroomList is called')
    console.log(data)
  });

  $("#send").on('click', function () {

    let messageText = $("#messageToSend").val()
    chatMessage.message = messageText;
    socket.emit("chat-msg",chatMessage)

  })

  $("#messageToSend").on('keypress', function () {

    socket.emit("typing","Shubham Singh")

  })

  socket.on("typing", (data) => {

    console.log(data+" is typing")
  
  });



}// end chat socket function

chatSocket();
