var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");
var router = express.Router();
var UserModel = require('../models/user');
import { User } from '../models/user'

const SECRET = process.env.SECRET;

router.post('/register', function (req:any, res:any, next:any) {
    var email = req.body.email
    var lname = req.body.lname
    var fname = req.body.fname
    var dob = req.body.dob
    var phone = req.body.phone
    var password = req.body.password

    UserModel.getUserByEmail(email, function (err:any, user:any) {
        if (err) res.status(500).json(err);
        if (user) {
            res.json({ success: false, param: 'email', msg: 'Email already exists' });
        }
        else {
            var newUser = new User('', email, fname, lname, 0, '', dob, phone, 0, password)
            newUser.createUser(newUser, function (err:any, user:any) {
                if (err) res.status(500).json(err)
                else {
                    res.json({ success: true, msg: 'Successful created new user' });
                }
            });
        }
    });
});

router.post('/login', function (req:any, res:any, next:any) {
    UserModel.getUserByEmail(req.body.email, function (err:any, users:Array<any>) {
        if (err) {
            res.status(500).json(err);
        } else if (users.length === 0) {
            res.status(404).json('Incorrect email or password');
        } else {
            var user = users[0]
            UserModel.comparePassword(req.body.password, user.user_password, function (err:any, isMatch:boolean) {
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

router.get('/getall', function (req:any, res:any, next:any) {
    UserModel.getAllUser(function (err:any, users:any){
        if (err) { res.status(500).json(err) }
        else {
            res.status(200).json(users)
        }
    });
});


router.post('/delete', function (req:any, res:any, next:any) {
    var selected = req.body.selected
    UserModel.deleteUser(selected, function (err:any, users:any) {
        if (err) { res.status(500).json(err) }
        else {
            res.status(200).json(users)
        }
    });
});


module.exports = router;