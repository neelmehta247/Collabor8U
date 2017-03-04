var mongoose = require('mongoose');

var sessionSchema = mongoose.Schema({
    session_token: String,
    active: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

var sessionModel = mongoose.model('Session', sessionSchema);

module.exports = sessionModel;