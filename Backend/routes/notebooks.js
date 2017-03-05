var express = require('express');
var router = express.Router();

var Notebook = require('../models/notebook');
var Session = require('../models/session');
var User = require('../models/user');
var Card = require('../models/card');
var Topic = require('../models/topic');

router.post('/:id/add_user', function (request, result) {
    if (request.body.session_token === undefined) {
        return result.status(400).send('no session token');
    }

    Session.findOne({session_token: request.body.session_token})
        .populate('user').exec(function (err, session) {
        if (err) {
            console.error(err);
            return result.status(500).send('error');
        }

        if (session == null) {
            console.error('session doesn\'t exist');
            return result.status(400).send('session doesn\'t exist');
        }

        var contained = false;
        session.user.notebooks.forEach(function (notebook) {
            if (notebook.toString() == request.params.id) {
                contained = true;
            }
        });

        if (!contained) {
            console.error('no notebook permissions');
        } else {
            if (request.body.email === undefined) {
                console.error('no email');
                return result.status(400).send('no email');
            }

            User.findOne({email: request.body.email}, function (err, user) {
                if (err) {
                    console.error(err);
                    return result.status(500).send('error');
                }

                if (user == null) {
                    console.error('no user found');
                    return result.status(400).send('no user found');
                }

                Notebook.findOne({_id: request.params.id}, function (err, notebook) {
                    if (err) {
                        console.error(err);
                        return result.status(500).send('error');
                    }

                    notebook.users.push(user);
                    notebook.save();

                    user.notebooks.push(notebook);
                    user.save();
                });
            });
        }
    });
});

router.post('/:id/cards/new', function (request, result) {
    if (request.body.session_token === undefined) {
        return result.status(400).send('no session token');
    }

    Session.findOne({session_token: request.body.session_token})
        .populate('user').exec(function (err, session) {
        if (err) {
            console.error(err);
            return result.status(500).send('error');
        }

        if (session == null) {
            console.error('session doesn\'t exist');
            return result.status(400).send('session doesn\'t exist');
        }

        var contained = false;
        session.user.notebooks.forEach(function (notebook) {
            if (notebook.toString() == request.params.id) {
                contained = true;
            }
        });

        if (!contained) {
            console.error('no notebook permissions');
        } else {
            if (request.body.title === undefined || request.body.topics === undefined) {
                console.error('missing params');
                return result.status(400).send('missing params');
            } else {
                Notebook.findOne({_id: request.params.id}, function (err, notebook) {
                    if (err) {
                        console.error(err);
                        return result.status(500).send('error');
                    }

                    var newCard = new Card({title: request.body.title});
                    newCard.save();

                    notebook.cards.push(newCard);
                    notebook.save();

                    request.body.topics.forEach(function (topic) {
                        Topic.findOne({name: topic, notebook: notebook._id}, function (err, topic) {
                            if (err) {
                                console.error(err);
                                return result.status(500).send('error');
                            }

                            if (topic == null) {
                                var newTopic = new Topic({name: topic.trim(), notebook: notebook._id});
                                newTopic.cards.push(newCard);
                                newTopic.save();

                                notebook.topics.push(topic);
                                notebook.save();

                                newCard.topics.push(newTopic);
                                newCard.save();
                            } else {
                                topic.cards.push(newCard);
                                topic.save();

                                newCard.topics.push(topic);
                                newCard.save();
                            }
                        });
                    });

                    return result.send(newCard);
                });
            }
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

router.get('/:id', function (request, result) {
    Notebook.findOne({_id: request.params.id})
        .populate('users cards topics').exec(function (err, notebook) {
        if (err) {
            console.error(err);
            return result.status(500).send('error');
        }

        if (notebook == null) {
            console.error('notebook doesn\'t exist');
            return result.status(400).send('user doesn\'t exist');
        } else {
            return result.send(notebook);
        }
    });
});

module.exports = router;