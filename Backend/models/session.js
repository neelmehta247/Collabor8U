var mongoose = require('mongoose');

var sessionSchema = mongoose.Schema({
    session_token: String,
    active: {type: Boolean, default: true},
    facebook_access_token: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

sessionSchema.pre('save', function (next) {
    this.session_token = this._id;
    next();
});

var sessionModel = mongoose.model('Session', sessionSchema);

module.exports = sessionModel;