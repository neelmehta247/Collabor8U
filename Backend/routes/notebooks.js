var express = require('express');
var router = express.Router();

var Notebook = require('../models/notebook');
var Session = require('../models/session');
var User = require('../models/user');

router.get('/:id', function (request, result) {
    Notebook.findOne({_id: request.params.id}, function (err, notebook) {
        if (err) {
            console.error(err);
            return result.status(500).send('error');
        }

        if (notebook == null) {
            console.error('user doesn\'t exist');
            return result.status(400).send('user doesn\'t exist');
        } else {
            return result.send(notebook);
        }
    });
});

router.post('/create', function (request, result) {
    if (request.body.name === undefined || request.body.session_token === undefined) {
        console.error('missing params');
        return result.status(400).send('missing params');
    }

    Session.findOne({session_token: request.body.session_token}, function (err, session) {
        if (err) {
            console.error(err);
            return result.status(500).send('error');
        }

        if (session == null) {
            console.error('no session found');
            return result.status(400).send('no session found');
        } else {
            User.findOne({_id: session.user}, function (err, user) {
                if (err) {
                    console.error(err);
                    return result.status(500).send('error');
                }

                var notebook = new Notebook({name: request.body.name});
                notebook.users.push(user);
                notebook.save();

                user.notebooks.push(notebook);
                user.save();

                return result.send(notebook);
            });
        }
    });
});

module.exports = router;