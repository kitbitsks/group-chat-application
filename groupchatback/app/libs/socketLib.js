/**
 * modules dependencies.
 */
const socketio = require('socket.io');
const mongoose = require('mongoose');
const shortid = require('shortid');
const logger = require('./loggerLib.js');
const events = require('events');
const eventEmitter = new events.EventEmitter();

const tokenLib = require("./tokenLib.js");
const check = require("./checkLib.js");
const response = require('./responseLib')
const ChatModel = mongoose.model('Chat');

let setServer = (server) => {
    
    let allOnlineUsers = []
    let listOfRoomAndNames = {}
    let io = socketio.listen(server);

    let myIo = io.of('/')
    myIo.on('connection',(socket) => {

        console.log("on connection--emitting verify user");

        socket.emit("verifyUser", "");
        
        socket.on('set-user',(authToken) => {

            console.log("set-user called")
            tokenLib.verifyClaimWithoutSecret(authToken,(err,user)=>{
                if(err){
                    socket.emit('auth-error', { status: 500, error: 'Please provide correct auth token' })
                }
                else{
                    
                    console.log("user is verified..setting details");
                    let currentUser = user.data;
                    // setting socket user id 
                    socket.userId = currentUser.userId
                    let fullName = `${currentUser.firstName} ${currentUser.lastName}`
                    console.log(`${fullName} is online`);
                    socket.fullName=fullName;
                    let userObj = {userId:currentUser.userId,fullName:fullName}
                    allOnlineUsers.push(userObj)
                    console.log(allOnlineUsers)
                    
                    socket.on('create-room',(nameOfRoom)=>{
                    // setting room name
                    if(socket.room!=undefined)
                        socket.emit('disconnect');
                    console.log(`createRoom is iniatiliased and connected to ${nameOfRoom} room`)
                    socket.room=nameOfRoom;
                    if(listOfRoomAndNames[socket.room]!=undefined){
                        listOfRoomAndNames[socket.room].push(userObj);
                    }
                    else{
                        listOfRoomAndNames[socket.room] = new Array();
                        listOfRoomAndNames[socket.room].push(userObj);
                    }
                    console.log(listOfRoomAndNames);
                    socket.join(socket.room)
                    //socket.emit('valueForJoin',1);
                   // allRoomList.push(socket.room)
                    socket.to(socket.room).broadcast.emit('online-user-list',listOfRoomAndNames[socket.room])
                    console.log(Object.keys(listOfRoomAndNames));
                    socket.broadcast.emit('roomsare',Object.keys(listOfRoomAndNames));                
                })
                

                    // joining chat-group room.
                    
               }
           })

        })
          
     // end of listening set-user event
     
     //Refreshing the roomsAvailable
     socket.on('onRefresh',()=>{
            socket.emit('roomsare',Object.keys(listOfRoomAndNames));
        })
     
     //refresh online users list
     socket.on('onRefreshOnline',()=>{
            socket.emit('online-user-list',listOfRoomAndNames[socket.room])
     }) 
     //switching to Different Room
     socket.on('switch-room',(switchingRoom)=>{
         console.log(socket.fullName+'has left'+socket.room);
        // socket.to(socket.room).broadcast.emit('leftRoom',socket.fullName); 
         if(socket.room!=undefined)
            socket.emit('disconnect');
         socket.room=switchingRoom;
         socket.join(socket.room);
        // socket.emit('valueForJoin',1);
         console.log(socket.fullName+'has joined'+socket.room);
         socket.to(socket.room).broadcast.emit('joinedRoom',socket.fullName);
         let userObj = {userId:socket.userId,fullName:socket.fullName}
        /* if(listOfRoomAndNames[socket.room]!=undefined)
         {
            listOfRoomAndNames[socket.room].push(userObj);
         }*/
         if(listOfRoomAndNames[socket.room]!=undefined){
            listOfRoomAndNames[socket.room].push(userObj);
        }
        else{
            listOfRoomAndNames[socket.room] = new Array();
            listOfRoomAndNames[socket.room].push(userObj);
        }
         console.log(listOfRoomAndNames);
         socket.to(socket.room).broadcast.emit('online-user-list',listOfRoomAndNames[socket.room])
         socket.broadcast.emit('roomsare',Object.keys(listOfRoomAndNames));
     })

     socket.on('editRoom',(newRoomObj)=>{
       //listOfRoomAndNames[newRoomObj.newRoom]=listOfRoomAndNames[newRoomObj.currentRoomName];
       //delete listOfRoomAndNames[newRoomObj.currentRoomName];
       //console.log("after changing the name of room");
       //console.log(listOfRoomAndNames);
       socket.broadcast.emit('roomNameEdited',newRoomObj);
       //socket.room= listOfRoomAndNames[newRoomObj.newRoom];
       //socket.to(socket.room).broadcast.emit('online-user-list',listOfRoomAndNames[socket.room])
      // socket.broadcast.emit('roomsare',Object.keys(listOfRoomAndNames));  
     })//editing the name of room

        socket.on('disconnect', () => {
            // disconnect the user from socket
            // remove the user from online list
            // unsubscribe the user from his own channel

            console.log("user is disconnected");
            // console.log(socket.connectorName);
            console.log(socket.userId);
            //socket.emit('valueForJoin',0);
            socket.to(socket.room).broadcast.emit('leftRoom',socket.fullName); 
            
            if(socket.room!=undefined){ 
            var removeIndex = listOfRoomAndNames[socket.room].map(function(user) { return user.userId; }).indexOf(socket.userId);
            listOfRoomAndNames[socket.room].splice(removeIndex,1)

            //deleting room from array if no user exist in room
            if(listOfRoomAndNames[socket.room].length==0)
                delete listOfRoomAndNames[socket.room]}
            //listing rooms and users
            console.log(listOfRoomAndNames)

            //listing room names
            console.log(Object.keys(listOfRoomAndNames));
            var removeIndex = allOnlineUsers.map(function(user) { return user.userId; }).indexOf(socket.userId);
            allOnlineUsers.splice(removeIndex,1)
            console.log(allOnlineUsers)

            socket.to(socket.room).broadcast.emit('online-user-list',listOfRoomAndNames[socket.room]);
            socket.broadcast.emit('roomsare',Object.keys(listOfRoomAndNames))
            socket.leave(socket.room)

        }) // end of on disconnect


        socket.on('chat-msg', (data) => {
            console.log("socket chat-msg called")
            console.log(data);
            data['chatId'] = shortid.generate()
            data['chatRoom'] = socket.room
            console.log(data);

            // event to save chat.
            setTimeout(function(){
                eventEmitter.emit('save-chat', data);

            },2000)
           // myIo.emit(data.receiverId,data);
            socket.to(socket.room).broadcast.emit('msg-recieved',data);

        });

        socket.on('typing',(fullName) => {
            
            socket.to(socket.room).broadcast.emit('typing',fullName);

        });




    });

}


// database operations are kept outside of socket.io code.

// saving chats to database.
eventEmitter.on('save-chat', (data) => {

    // let today = Date.now();

    let newChat = new ChatModel({
        chatId: data.chatId,
        senderName: data.senderName,
        senderId: data.senderId,
        receiverName: data.receiverName || '',
        receiverId: data.receiverId || '',
        message: data.message,
        chatRoom: data.chatRoom || '',
        createdOn: data.createdOn

    });

    newChat.save((err,result) => {
        if(err){
            console.log(`error occurred: ${err}`);
        }
        else if(result == undefined || result == null || result == ""){
            console.log("Chat Is Not Saved.");
        }
        else {
            console.log("Chat Saved.");
            console.log(result);
        }
    })
}); // end of saving chat.

module.exports = {
    setServer: setServer
}
