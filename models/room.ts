
var db = require('../connect')

export class Room {
    image: string = 'default_room.jpg'
    type: string = ''
    quantity: number = 0
    description: string = ''
    price: number = 0

    constructor(image: string, type: string, quantity: number, description: string, price: number) {
        this.type = type
        this.description = description
        this.price = price
        this.quantity = quantity
    }
    createRoom = function (newRoom: Room, callback: any) {
        var sql = `INSERT INTO rooms VALUES (NULL, '${newRoom.image}', '${newRoom.type}', '${newRoom.description}', ${newRoom.quantity}, ${newRoom.price});`
        db.connectDB(function (err: any, connect: any) {
            if (err) callback(err, null)
            else {
                connect.query(sql, callback);
                db.disconnectDB(connect)
            }
        })
    }
    updateRoom = function (id: number, newRoom: Room, callback: any) {
        var sql = `UPDATE rooms SET room_image = '${newRoom.image}', room_description = '${newRoom.description}', room_type = '${newRoom.type}', room_quantity = ${newRoom.quantity}, room_price = ${newRoom.price} WHERE (room_id = ${id});`
        db.connectDB(function (err: any, connect: any) {
            if (err) callback(err, null)
            else {
                connect.query(sql, callback);
                db.disconnectDB(connect)
            }
        })
    }
}
module.exports.getAllAvailableRoom = function (check_in_date: string, check_out_date: string, callback: any) {
    var sql = `SELECT r.room_id, r.room_image, r.room_type, r.room_description, r.room_price, COUNT(re.room_id) as availablequantity, r.room_quantity FROM HotelReservation.rooms r LEFT JOIN HotelReservation.reservations re ON re.room_id = r.room_id AND re.check_in_date <= ${check_out_date} AND re.check_out_date >= ${check_in_date} GROUP BY r.room_id;`
    db.connectDB(function (err: any, connect: any) {
        if (err) callback(err, null)
        else {
            connect.query(sql, callback);
            db.disconnectDB(connect)
        }
    })
}

module.exports.getAllRoom = function (callback: any) {
    var sql = `SELECT * FROM rooms;`
    db.connectDB(function (err: any, connect: any) {
        if (err) callback(err, null)
        else {
            connect.query(sql, callback);
            db.disconnectDB(connect)
        }
    })
}
module.exports.deteteRoom = function (id: number, callback: any) {
    var sql1 = `DELETE FROM reservations WHERE (room_id = ${id});`
    var sql2 = `DELETE FROM rooms WHERE (room_id = ${id});`
    db.connectDB(function (err: any, connect: any) {
        if (err) callback(err, null)
        else {
            connect.query(sql1, function(err:any, result:any){
                if (err) callback(err, null)
                else {
                    connect.query(sql2, callback)
                    db.disconnectDB(connect)
                }
            })
            
        }
    })
}
