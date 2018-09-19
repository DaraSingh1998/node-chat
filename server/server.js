const path=require('path');
const express = require('express');
const http = require('http');
const socketIO=require('socket.io');

var {generateMessage,generateLocationMessage}=require('./utils/message');
const {isRealString}=require('./utils/validation');
const {Users}=require('./utils/users');
const publicPath=path.join(__dirname,'../public');

var port=process.env.PORT ||3000;
var app=express();
var server=http.createServer(app);
var io=socketIO(server);
var users=new Users();

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('New user connected...');

  socket.on('join',(params,callback)=>{
    if(!isRealString(params.name)||!isRealString(params.room)){
      return callback('Name and room name are required');
    }
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id,params.name,params.room);
    // io.emit->io.to('Room name').emit;
    // socket.emit->socket.to('Room Name').emit;
    // socket.broadcast.emit->socket.broadcast.to('Room Name').emit;
    io.to(params.room).emit('updateUsersList',users.getUserList(params.room));
    socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined`));
    callback();
  });

  socket.on('createMessage',(msg,callback)=>{
    console.log("New Message",msg);
    io.emit('newMessage',generateMessage(msg.from,msg.text));
    callback();
  });
  socket.on('createLocationMessage',(coords)=>{
    io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude, coords.longitude));
  });
  socket.on('disconnect',()=>{
    var user=users.removeUser(socket.id);

    if(user){
      io.to(user.room).emit('updateUsersList',users.getUserList(user.room));
      io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left the chat room`));
    }
  });
});

server.listen(port,()=>{
  console.log(`Server started at port ${port}`);
});
