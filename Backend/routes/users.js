var express = require('express');
var router = express.Router();

var User = require('../models/user');
var Session = require('../models/session');

var graph = require('fbgraph');
var config = require('../config');
graph.setAppSecret(config.facebookAppSecret);
graph.setVersion('2.8');

/* GET users listing. */
router.get('/', function (req, res) {
    User.find({}, function (err, users) {
        if (err) {
            res.status(500).send('error');
            return console.error(err);
        }

        res.send(users.length.toString());
    });
});

router.post('/sign_up', function (request, result) {
    User.findOne({facebook_access_token: request.body.access_token}, function (err, user) {
        if (err) {
            console.error(err);
            return result.status(500).send('error');
        }

        if (user != null) {
            return result.status(999).send('error');
        }
    });

    graph.get('me', {access_token: request.body.access_token}, function (err, res) {
        if (err) {
            console.error(err);
            return result.status(500).send('error');
        }

        graph.get(res.id.toString(), {fields: 'email,name'}, function (err, res) {
            if (err) {
                console.error(err);
                return result.status(500).send('error');
            }

            var newUser = new User({
                name: res.name,
                facebook_access_token: request.body.facebook_access_token,
                email: res.email
            });
            newUser.save(function (err, newUser) {
                if (err) {
                    console.error(err);
                    return result.status(500).send('error');
                }

                var session = new Session({user: newUser._id});
                session.save(function (err, session) {
                    if (err) {
                        console.error(err);
                        return result.status(500).send('error');
                    }

                    session.populate('user').exec(function (err, session) {
                        if (err) {
                            console.error(err);
                            return result.status(500).send('error');
                        }

                        result.send(session);
                    });
                });
            });
        });
    });
});

module.exports = router;
