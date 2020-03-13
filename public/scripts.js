var socket = io('http://localhost:3000');

function renderMessage(message) {
    $('.messages').append('<div class="message"><b>' + message.username + '</b>: ' + message.message + '</di>');
};

function userConnected() {
    $('.messages').append('<div class="message">A user has been connected.</di>');
};

function userDisconnected() {
    $('.messages').append('<div class="message">A user has been disconnected.</di>');
};

socket.on('receivedMessage', function(message){
    renderMessage(message);
});

socket.on('previousMessages', function(messages){
    for (message of messages) {
        renderMessage(message);
    };
});

socket.on('userConnected', function(){
    userConnected();
});

socket.on('userDisconnected', function(){
    userDisconnected();
});

$('#chat').submit(function(event){
    event.preventDefault();

    var username = $('input[name=username]').val();
    var message = $('input[name=message]').val();

    if (username.length && message.length) {
        var messageObject = {
            username: username,
            message: message
        };

        renderMessage(messageObject);

        socket.emit('sendMessage', messageObject);
    };
});
