var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
var router = express.Router();

var UserModel = require('../models/user');
import { User } from '../models/user'

router.post('/register', function (req, res, next) {
    var email = req.body.email
    var lname = req.body.lname
    var fname = req.body.fname
    var dob = req.body.dob
    var phone = req.body.phone
    var password = password

    UserModel.getUserByEmail(email, function (err, user) {
        if (err) res.status(500).json(err);
        if (user) {
            res.json({ success: false, param: 'email', msg: 'Email already exists' });
        }
        else {
            var newUser = new User('', email, fname, lname, 0, '', dob, phone, 0, password)
            User.createUser(newUser, function (err, user) {
                if (err) res.status(500).json(err)
                else {
                    res.json({ success: true, msg: 'Successful created new user' });
                }
            });
        }
    });
});

router.post('/login', function (req, res, next) {
    UserModel.getUserByEmail(req.body.email, function (err, user) {
        if (err) {
            res.status(500).json(err);
        } else if (user == []) {
            res.status(404).json('Incorrect email or password');
        } else {
            user = user[0]
            UserModel.comparePassword(req.body.password, user.user_password, function (err, isMatch) {
                if (err) {
                    res.status(500).json(err);
                } else if (isMatch) {
                    var token = jwt.sign({
                        id: user.user_id,
                        type: user.user_admin
                        }, SECRET, {
                        algorithm: 'HS256',
                        expiresIn: 604800 // 1 week
                    });
                    res.json({
                        success: true,
                        access_token: token,
                        message: 'User has been logged in'
                    });
                } else {
                    res.status(403).json('Incorrect email or password');
                }
            });
        }
    });

});

// router.get('/me', function (req, res, next) {
//     var user = req.user;
//     user.password = undefined;
//     res.json({ success: true, user: user });
// });

router.get('/getall', function (req, res, next) {
    User.getAllUser(function (err, users) {
        if (err) { res.status(500).json(err) }
        else {
            res.status(200).json(users)
        }
    });
});

router.get('/get-by-username/:username', function (req, res, next) {
    var username = req.params.username
    User.getUserByUsername(username, function (err, users) {
        if (err) { res.status(500).json(err) }
        else {
            res.status(200).json(users)
        }
    });
});

router.post('/delete', function (req, res, next) {
    var selected = req.body.selected
    User.deleteUser(selected, function (err, users) {
        if (err) { res.status(500).json(err) }
        else {
            res.status(200).json(users)
        }
    });
});


router.post('/activate', function (req, res, next) {
    User.getUserByUsername(req.body.username, function (err, user) {
        if (err) {
            res.send(err);
            return;
        }
        if (!user) {
            res.json({ message: 'User not found' });
            return;
        }
        if (user.status == 'block') {
            res.json({ message: 'The account has been blocked' });
            return;
        }
        if (user._id == req.body.id) {
            User.updateUserStatus(user._id, 'active', function (err, user) {
                if (err) {
                    res.send(err);
                    return;
                }
                res.json({ message: 'The account has been activated' });
            });
        } else {
            res.json({ message: 'The activation link is invalid' });
        }
    });
});


module.exports = router;