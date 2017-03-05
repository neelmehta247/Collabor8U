var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: String,
    email: String,
    notebooks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Notebook'
    }]
});

var userModel = mongoose.model('User', userSchema);

module.exports = userModel;