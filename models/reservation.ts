
var db = require('../connect')

export class Reservation {
    user_id: number = 0
    room_id: number = 0
    check_out_date: string = ''
    check_in_date: string = ''
    amount: number = 0

    constructor(user_id: number, room_id: number, check_in_date: string, check_out_date: string, amount:number) {
        this.user_id = user_id
        this.room_id = room_id
        this.check_in_date = check_in_date
        this.check_out_date = check_out_date
        this.amount = amount
    }
    createReservation = function (newReservation: Reservation, callback: any) {
        if (newReservation.check_out_date == ''){newReservation.check_out_date = 'NULL'}
        else {newReservation.check_out_date = `'${newReservation.check_out_date}'`}
        var sql = `INSERT INTO reservations (user_id, room_id, check_out_date, check_in_date, amount) VALUES (${newReservation.user_id}, ${newReservation.room_id}, ${newReservation.check_out_date}, '${newReservation.check_in_date}', ${newReservation.amount});`
        db.connectDB(function (err: any, connect: any) {
            if (err) callback(err, null)
            else {
                connect.query(sql, callback);
                db.disconnectDB(connect)
            }
        })
    }
    updateReservation = function (id: number, newReservation: Reservation, callback: any) {
        if (newReservation.check_out_date == ''){newReservation.check_out_date = 'NULL'}
        else {newReservation.check_out_date = `'${newReservation.check_out_date}'`}
        var sql = `UPDATE reservations SET check_in_date = '${newReservation.check_in_date}', check_out_date = ${newReservation.check_out_date}, amount = ${newReservation.amount} WHERE (reservation_id = ${id}) AND (check_in_date > DATE(NOW()));`
        db.connectDB(function (err: any, connect: any) {
            if (err) callback(err, null)
            else {
                connect.query(sql, callback);
                db.disconnectDB(connect)
            }
        })
    }
}

module.exports.getReservationForCustomer = function (id: number, callback: any) {
    var sql = `SELECT r.*, re.amount, re.check_in_date, re.check_out_date, re.reservation_id from reservations re INNER JOIN rooms r ON r.room_id = re.room_id WHERE re.user_id = ${id}`
    db.connectDB(function (err: any, connect: any) {
        if (err) callback(err, null)
        else {
            connect.query(sql, callback);
            db.disconnectDB(connect)
        }
    })
}

module.exports.deleteReservation = function (id: number, callback: any) {
    var sql = `DELETE FROM reservations WHERE (reservation_id = ${id}) AND (check_in_date > DATE(NOW()));`
    db.connectDB(function (err: any, connect: any) {
        if (err) callback(err, null)
        else {
            connect.query(sql, callback);
            db.disconnectDB(connect)
        }
    })
}
