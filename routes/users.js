var express = require('express');
var router = express.Router();

var User = require('../models/user');

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

router.post('/sign_up', function (req, res) {

});

module.exports = router;
