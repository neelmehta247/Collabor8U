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

router.get('/me', function (request, result) {
    if (request.query.session_token === undefined) {
        console.error('no query');
        return result.status(400).send('no query');
    } else {
        Session.findOne({session_token: request.query.session_token})
            .populate('user').exec(function (err, session) {
            if (err) {
                console.error(err);
                return result.status(500).send('error');
            }

            return result.json(session);
        });
    }
});

router.post('/login', function (request, result) {
    console.log(request.body);
    if (request.body.facebook_access_token === undefined) {
        console.error('no token provided');
        return result.status(400).send('no token provided');
    }

    Session.findOne({facebook_access_token: request.body.access_token})
        .populate('user').exec(function (err, session) {
        if (err) {
            console.error(err);
            return result.status(500).send('error');
        }

        if (session != null) {
            if (session.active) {
                return result.json(session);
            } else {
                var newSession = createNewSession(session.user, request.body.facebook_access_token);
                if (newSession == 'error') {
                    return result.status(500).send('error');
                } else {
                    return result.json(newSession);
                }
            }
        } else {
            graph.get('me', {access_token: request.body.facebook_access_token}, function (err, res) {
                if (err) {
                    console.error(err);
                    return result.status(500).send('error');
                }

                graph.get(res.id.toString(), {
                    access_token: request.body.facebook_access_token,
                    fields: 'email,name'
                }, function (err, res) {
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
                                return result.json(session);
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
                                    return result.json(session);
                                }
                            });
                        }
                    });
                });
            });
        }
    });
});

router.get('/:id', function (request, result) {
    User.findOne({_id: request.params.id}, function (err, user) {
        if (err) {
            console.error(err);
            return result.status(500).send('error');
        }

        if (user == null) {
            console.error('user doesn\'t exist');
            return result.status(400).send('user doesn\'t exist');
        } else {
            return result.json(user);
        }
    });
});

function createNewSession(user, access_token) {
    var session = new Session({
        user: user,
        facebook_access_token: access_token
    });
    session.save(function (err, session) {
        if (err) {
            console.error(err);
            return 'error';
        }

        return session;
    });
}

module.exports = router;
