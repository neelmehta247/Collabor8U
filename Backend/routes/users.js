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

            return result.send(session);
        });
    }
});

router.post('/login', function (request, result) {
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
                return result.send(session);
            } else {
                var newSession = new Session({
                    user: session.user,
                    facebook_access_token: request.body.facebook_access_token
                });
                newSession.save(function (err, session) {
                    if (err) {
                        console.error(err);
                        return result.status(500).send('error');
                    }
                    return result.send(session);
                });
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
                            var newSession = new Session({
                                user: user,
                                facebook_access_token: request.body.facebook_access_token
                            });
                            newSession.save(function (err, session) {
                                if (err) {
                                    console.error(err);
                                    return result.status(500).send('error');
                                }
                                console.log(session);
                                return result.send(session);
                            });
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

                                var newSession = new Session({
                                    user: newUser,
                                    facebook_access_token: request.body.facebook_access_token
                                });
                                newSession.save(function (err, session) {
                                    if (err) {
                                        console.error(err);
                                        return result.status(500).send('error');
                                    }
                                    console.log(session);
                                    return result.send(session);
                                });
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
            return result.send(user);
        }
    });
});

module.exports = router;
