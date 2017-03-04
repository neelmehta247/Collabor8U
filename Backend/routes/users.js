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

router.post('/login', function (request, result) {
    if (request.body.facebook_access_token === undefined) {
        console.error('no token provided');
        return result.status(400).send('no token provided');
    }

    Session.findOne({facebook_access_token: request.body.access_token}, function (err, session) {
        if (err) {
            console.error(err);
            return result.status(500).send('error');
        }

        if (session != null) {
            session.populate('user').exec(function (err, session) {
                if (err) {
                    console.error(err);
                    return result.status(500).send('error');
                }

                if (session.active) {
                    return result.send(session);
                } else {
                    var newSession = createNewSession(session.user, request.body.facebook_access_token);
                    if (newSession == 'error') {
                        return result.status(500).send('error');
                    } else {
                        return result.send(newSession);
                    }
                }
            });
        } else {
            graph.get('me', {access_token: request.body.facebook_access_token}, function (err, res) {
                if (err) {
                    console.error(err);
                    return result.status(500).send('error');
                }

                graph.get(res.id.toString(), {fields: 'email,name'}, function (err, res) {
                    if (err) {
                        console.error(err);
                        return result.status(500).send('error');
                    }

                    User.findOne({email: res.email}, function (err, user) {
                        if (err) {
                            console.error(err);
                            return result.status(500).send('error');
                        }

                        if (user != null) {
                            var session = createNewSession(user, request.body.facebook_access_token);
                            if (session == 'error') {
                                return result.status(500).send('error');
                            } else {
                                return result.send(session);
                            }
                        } else {
                            var newUser = new User({
                                name: res.name,
                                email: res.email
                            });
                            newUser.save(function (err, newUser) {
                                if (err) {
                                    console.error(err);
                                    return result.status(500).send('error');
                                }

                                var session = createNewSession(newUser, request.body.facebook_access_token);
                                if (session == 'error') {
                                    return result.status(500).send('error');
                                } else {
                                    return result.send(session);
                                }
                            });
                        }
                    });
                });
            });
        }
    });
});

function createNewSession(user, access_token) {
    var session = new Session({
        user: user._id,
        facebook_access_token: access_token
    });
    session.save(function (err, session) {
        if (err) {
            console.error(err);
            return 'error';
        }

        session.populate('user').exec(function (err, session) {
            if (err) {
                console.error(err);
                return 'error';
            }

            return session;
        });
    });
}

module.exports = router;
