var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: String,
    email: String
});

var userModel = mongoose.model('User', userSchema);

module.exports = userModel;