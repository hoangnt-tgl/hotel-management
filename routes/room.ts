var express = require('express');
var router = express.Router();
var UserModel = require('../models/user');
var RoomModel = require('../models/room');
import { Room } from '../models/room'

router.post('/getavailableroom', function (req: any, res: any, next: any) {
    var startdate = req.body.startdate
    var enddate = req.body.enddate
    RoomModel.getAllAvailableRoom(startdate, enddate, function (err: any, result: any) {
        if (err) res.status(500).json(err)
        else if (result) {
            res.status(200).json(result)
        }
    })
})

router.get('/getallroom', function (req: any, res: any, next: any) {
    RoomModel.getAllRoom(function (err: any, result: any) {
        if (err) res.status(500).json(err)
        else if (result) {
            res.status(200).json(result)
        }
    })
})

router.post('/createroom', UserModel.checkLogin, function (req: any, res: any, next: any) {
    if (req.user.type == 1 || req.user.type == 2) {
        var image = req.body.image
        var type = req.body.type
        var quantity = req.body.quantity
        var description = req.body.description
        var price = req.body.price
        var newRoom = new Room(image, type, quantity, description, price)
        newRoom.createRoom(newRoom, function (err: any, result: any) {
            if (err) res.status(500).json(err)
            else if (result) {
                res.status(200).json(result)
            }
        })
    } else {
        res.status(401).json({ auth: false, message: 'Failed to authenticate' });
    }

})

router.post('/update', UserModel.checkLogin, function (req: any, res: any, next: any) {
    if (req.user.type == 1 || req.user.type == 2) {
        var id = req.body.id
        var image = req.body.image
        var type = req.body.type
        var quantity = req.body.quantity
        var description = req.body.description
        var price = req.body.price
        var newRoom = new Room(image, type, quantity, description, price)
        newRoom.updateRoom(id, newRoom, function (err: any, result: any) {
            if (err) res.status(500).json(err)
            else {
                res.status(200).json(result)
            }
        })
    } else {
        res.status(401).json({ auth: false, message: 'Failed to authenticate' });
    }

})

router.post('/delete', UserModel.checkLogin, function (req: any, res: any, next: any) {
    if (req.user.type == 1 || req.user.type == 2) {
        var selected = req.body.selected
        RoomModel.deteteRoom(selected, function (err: any, result: any) {
            if (err) res.status(500).json(err)
            else {
                res.status(200).json(result)
            }
        })
    } else {
        res.status(401).json({ auth: false, message: 'Failed to authenticate' });
    }
})

module.exports = router