var express = require('express');
var router = express.Router();
var ReservationModel = require('../models/reservation');
var UserModel = require('../models/user');
import { Reservation } from '../models/reservation'

router.post('/create-reservation', UserModel.checkLogin, function (req: any, res: any, next: any) {
    var user_id = req.user.id
    var room_id = req.body.room_id
    var check_in_date = req.body.check_in_date.slice(0, 10)
    var check_out_date = req.body.check_out_date.slice(0, 10)
    var amount = req.body.amount
    var newReservation = new Reservation(user_id, room_id, check_in_date, check_out_date, amount)
    newReservation.createReservation(newReservation, function (err: any, result: any) {
        if (err) res.status(500).json(err)
        else if (result) {
            res.status(200).json(result)
        }
    })
})

router.post('/update-reservation', UserModel.checkLogin, function (req: any, res: any, next: any) {
    
    var reservation_id = req.body.reservation_id
    var check_in_date = req.body.check_in_date.slice(0, 10)
    var check_out_date = req.body.check_out_date.slice(0, 10)
    var amount = req.body.amount
    var newReservation = new Reservation(0, 0, check_in_date, check_out_date, amount)
    newReservation.updateReservation(reservation_id, newReservation, function (err: any, result: any) {
        if (err) res.status(500).json(err)
        else if (result) {
            res.status(200).json(result)
        }
    })
})


router.get('/get-reservation-for-customer', UserModel.checkLogin, function (req: any, res: any, next: any) {
    var user_id = req.user.id
    ReservationModel.getReservationForCustomer(user_id, function (err: any, result: any) {
        if (err) res.status(500).json(err)
        else if (result) {
            res.status(200).json(result)
        }
    })
})

router.post('/delete-reservation', UserModel.checkLogin, function (req: any, res: any, next: any) {
    var reservation_id = req.body.reservation_id
    ReservationModel.deleteReservation(reservation_id, function (err: any, result: any) {
        if (err) res.status(500).json(err)
        else if (result) {
            res.status(200).json(result)
        }
    })
})

module.exports = router