var socket=io();

socket.on('connect',function(){
  console.log('Connected to server');
});

socket.on('newMessage',function(msg){
  var formattedTime=moment(msg.createdAt).format('h:mm a');
  var template=jQuery('#message-template').html();
  var html=Mustache.render(template,{
    text:msg.text,
    from:msg.from,
    createdAt:formattedTime
  });
  jQuery('#messages').append(html);
});

socket.on('newLocationMessage',function (msg){
  var formattedTime=moment(msg.createdAt).format('h:mm a');
  var template=jQuery('#location-message-template').html();
  var html=Mustache.render(template,{
    from:msg.from,
    url:msg.url,
    createdAt:formattedTime
  });
  jQuery('#messages').append(html);
});

socket.on('disconnect',function(){
  console.log('Disconnected from the server');
});


jQuery('#message-form').on('submit',function (e) {
  e.preventDefault();

  var messageTextbox=jQuery('[name=message]');

  socket.emit('createMessage',{
    from:'User',
    text:messageTextbox.val()
  },function () {
    messageTextbox.val("");
  });

});
var locationButton=jQuery('#send-location');
locationButton.on('click',function () {
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser');
  }
  locationButton.attr('disabled','disabled').text('Sending Location......');
  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text("Send Location");
    socket.emit('createLocationMessage',{
      latitude:position.coords.latitude,
      longitude:position.coords.longitude
    });
  },function (){
    locationButton.removeAttr('disabled').text("Send Location");
    alert('Unable to fetch your location.');
  });
});
