var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: String,
    facebook_access_token: String,
    email: String
});

var userModel = mongoose.model('User', userSchema);

module.exports = userModel;