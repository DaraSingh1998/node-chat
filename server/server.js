const path=require('path');
const express = require('express');
const http = require('http');
const socketIO=require('socket.io');

var {generateMessage}=require('./utils/message');
const publicPath=path.join(__dirname,'../public');

var port=process.env.PORT ||3000;
var app=express();
var server=http.createServer(app);
var io=socketIO(server);


app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('New user connected...');
  socket.emit('newMessage',generateMessage('Admin','Welcome to the chat app'));

  socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));

  socket.on('createMessage',(msg,callback)=>{
    console.log("New Message",msg);
    io.emit('newMessage',generateMessage(msg.from,msg.text));
    callback('This is a msessage from the server');
    // socket.broadcast.emit('newMessage',{
    //   from:msg.from,
    //   text:msg.text,
    //   createdAt:new Date().getTime()
    // });
  });

  socket.on('disconnect',()=>{
    console.log('Client disconnected');
  });
});

server.listen(port,()=>{
  console.log(`Server started at port ${port}`);
});
