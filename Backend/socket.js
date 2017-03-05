var Card = require('./models/card');

var socket = function (server) {
    var io = require('socket.io')(server);

    io.on('connection', function (socket) {
        socket.on('join', function (req) {
            socket.join(req.notebook);
        });

        socket.on('leave', function (req) {
            socket.leave(req.notebook);
        });

        socket.on('beginEdit', function (req) {
            Card.findOne({_id: req.card_id}, function (err, card) {
                if (!err) {
                    if (card != null) {
                        card.is_being_edited = true;
                        card.save();
                    }
                }
            });
        });

        socket.on('finishEdit', function (req) {
            Card.findOne({_id: req.card_id}, function (err, card) {
                if (!err) {
                    if (card != null) {
                        card.is_being_edited = false;
                        card.save();
                    }
                }
            });
        });

        socket.on('edit', function (req) {
            Card.findOne({_id: req.card_id}, function (err, card) {
                if (!err) {
                    if (card != null) {
                        card.text = req.text;
                        card.save();

                        io.sockets.in(req.notebook).emit('edit', card);
                    }
                }
            });
        });

        socket.on('updateTitle', function (req) {
            Card.findOne({_id: req.card_id}, function (err, card) {
               if (!error) {
                   if (card != null) {
                       card.title = req.title;
                       card.save();

                       io.sockets.in(req.notebook).emit('updateTitle', card);
                   }
               }
            });
        });
    });

    module.exports = io;
};

module.exports = socket;