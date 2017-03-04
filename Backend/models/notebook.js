var mongoose = require('mongoose');

var notebookSchema = mongoose.Schema({
    name: String,
    users: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }]
});

var notebookModel = mongoose.model('Notebook', notebookSchema);

module.exports = notebookModel;