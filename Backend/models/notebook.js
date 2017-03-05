var mongoose = require('mongoose');

var notebookSchema = mongoose.Schema({
    name: String,
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    cards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card'
    }],
    topics: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic'
    }]
});

var notebookModel = mongoose.model('Notebook', notebookSchema);

module.exports = notebookModel;