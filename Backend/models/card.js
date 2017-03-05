var mongoose = require('mongoose');

var cardSchema = mongoose.Schema({
    text: {
        type: String,
        default: ''
    },
    title: String,
    is_being_edited: {
        type: Boolean,
        default: false
    },
    topics: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic'
    }]
});

var cardModel = mongoose.model('Card', cardSchema);

module.exports = cardModel;