var socket = io('http://localhost:3000');

function renderMessage(message) {
    $('.messages').append('<div class="message"><b>' + message.username + '</b>: ' + message.message + '</di>');
};

socket.on('receivedMessage', function(message){
    renderMessage(message);
});

socket.on('previousMessages', function(messages){
    for (message of messages) {
        renderMessage(message);
    };
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
