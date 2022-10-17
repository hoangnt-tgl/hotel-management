var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
var router = express.Router();
var UserModel = require('../models/user');
import { User } from '../models/user'

const SECRET = process.env.SECRET;

router.post('/register', function (req: any, res: any, next: any) {
    var email = req.body.username
    var lname = req.body.lname
    var fname = req.body.fname
    var password = req.body.password

    UserModel.getUserByEmail(email, function (err: any, users: Array<any>) {
        if (err) res.status(500).json(err);
        else if (users.length > 0) {
            res.json({ success: false, param: 'email', msg: 'Email already exists' });
        }
        else {
            var newUser = new User('', email, fname, lname, 0, '', '', '', 0, password)
            newUser.createUser(newUser, function (err: any, user: any) {
                if (err) res.status(500).json(err)
                else {
                    res.json({ success: true, msg: 'Successful created new user' });
                }
            });
        }
    });
});

router.post('/create-administrator', UserModel.checkLogin, function (req: any, res: any, next: any) {
    if (req.user.type == 2) {
        var email = req.body.username
        var lname = req.body.lname
        var fname = req.body.fname
        var password = req.body.password
        var role = req.body.role
        UserModel.getUserByEmail(email, function (err: any, users: Array<any>) {
            if (err) res.status(500).json(err);
            else if (users.length > 0) {
                res.json({ success: false, param: 'email', msg: 'Email already exists' });
            }
            else {
                var newUser = new User('', email, fname, lname, 0, '', '', '', role, password)
                newUser.createUser(newUser, function (err: any, user: any) {
                    if (err) res.status(500).json(err)
                    else {
                        res.json({ success: true, msg: 'Successful created new user' });
                    }
                });
            }
        });
    }
    else {
        res.json({ success: false, msg: 'You are not authorized' });
    }
});



router.post('/login', function (req: any, res: any, next: any) {
    UserModel.getUserByEmail(req.body.username, function (err: any, users: Array<any>) {
        if (err) {
            res.status(500).json(err);
        } else if (users.length === 0) {
            res.json({ success: false, message: 'Incorrect email or password' });
        } else {
            var user = users[0]
            UserModel.comparePassword(req.body.password, user.user_password, function (err: any, isMatch: boolean) {
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
                        id: user.user_id,
                        message: 'User has been logged in'
                    });
                } else {
                    res.json({ success: false, message: 'Incorrect email or password' });
                }
            });
        }
    });

});

router.get('/me/:id', UserModel.checkLogin, function (req: any, res: any, next: any) {
    let id = req.params.id
    UserModel.getUserById(id, function (err: any, users: any) {
        if (err) { res.status(500).json(err) }
        else {
            res.status(200).json(users)
        }
    });
});

router.get('/getall', UserModel.checkLogin, function (req: any, res: any, next: any) {
    if (req.user.type == 1 || req.user.type == 2) {
        UserModel.getAllUser(function (err: any, users: any) {
            if (err) { res.status(500).json(err) }
            else {
                res.status(200).json(users)
            }
        });
    } else {
        res.status(401).json({ auth: false, message: 'Failed to authenticate' });
    }
});


router.post('/delete', UserModel.checkLogin, function (req: any, res: any, next: any) {
    if (req.user.type == 2) {
        var selected = req.body.selected
        UserModel.deleteUser(selected, function (err: any, users: any) {
            if (err) { res.status(500).json(err) }
            else {
                res.status(200).json(users)
            }
        });
    } else {
        res.status(401).json({ auth: false, message: 'You are not authorized' });
    }
});


module.exports = router;