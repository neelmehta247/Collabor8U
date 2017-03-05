var socketEventListener = require('./eventListener');

var initialiseSocket = function (server) {
    var io = require('socket.io')(server);

    io.on('connection', socketEventListener);
    module.exports = io;
};

module.exports = initialiseSocket;