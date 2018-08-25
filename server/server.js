const path=require('path');
const express = require('express');
const http = require('http');
const socketIO=require('socket.io');

const publicPath=path.join(__dirname,'../public');

var port=process.env.PORT ||3000;
var app=express();
var server=http.createServer(app);
var io=socketIO(server);


app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('New user connected...');


  socket.on('createMessage',(msg)=>{
    console.log("New Message",msg);
    io.emit('newMessage',{
      from:msg.from,
      text:msg.text,
      createdAt:new Date().getTime()
    });
  });

  socket.on('disconnect',()=>{
    console.log('Client disconnected');
  });
});

server.listen(port,()=>{
  console.log(`Server started at port ${port}`);
});
