var express = require('express');
var router = express.Router();
var RoomModel = require('../models/room');
import { Room } from '../models/room'

router.post('/getavailableroom', function (req: any, res: any, next: any) {
    var check_in_date = req.body.check_in_date
    var check_out_date = req.body.check_out_date
    RoomModel.getAllAvailableRoom(check_in_date, check_out_date, function (err: any, result: any) {
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

router.post('/createroom', function (req: any, res: any, next: any) {
    var image = req.body.image
    var type = req.body.type
    var quantity = req.body.quantity
    var description = req.body.description
    var price = req.body.price
    var newRom = new Room(image, type, quantity, description, price)
    newRom.createRoom(newRom, function (err: any, result: any) {
        if (err) res.status(500).json(err)
        else if (result) {
            res.status(200).json(result)
        }
    })
})

router.post('/update', function (req: any, res: any, next: any) {
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
})

router.get('/delete/:id', function (req: any, res: any, next: any) {
    var id = req.params.id    
    RoomModel.deteteRoom(id, function (err: any, result: any) {
        if (err) res.status(500).json(err)
        else {
            res.status(200).json(result)
        }
    })
})

module.exports = router