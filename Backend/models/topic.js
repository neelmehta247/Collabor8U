var mongoose = require('mongoose');

var topicSchema = mongoose.Schema({
    name: String,
    cards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card'
    }]
});

var topicModel = mongoose.model('Topic', topicSchema);

module.exports = topicModel;