//make connectio server with socket
const port = process.env.POST || 3000;

var socket = io.connect(`https://gentle-beach-19879.herokuapp.com:${port}`);

//Query dom
var message = document.getElementById("message");
var handle = document.getElementById("handle");
var btn = document.getElementById("send");
var output = document.getElementById("output");
var feedback = document.getElementById("feedback");

//emit events
btn.addEventListener('click', function(){
    socket.emit('chat', {
        message : message.value,
        handle : handle.value
    })
});

//listen for events
socket.on('chat', function(data){
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
    feedback.innerHTML = "";
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>'+ data +' is typing a message</em></p>';
});

//listen for keypress on input field
message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
})
