
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
// COALESCE(SUM(re.amount, 0)) as available
module.exports.getAllAvailableRoom = function (startdate: string, enddate: string, callback: any) {
    var sql = ''
    if (enddate == ''){
        sql = `SELECT r.*, (r.room_quantity - IFNULL(nt.booked, 0)) as available FROM rooms r LEFT JOIN (
            SELECT r.room_id, SUM(re.amount) as booked FROM rooms r LEFT JOIN reservations re ON (r.room_id = re.room_id) WHERE ((re.check_out_date IS NULL AND re.check_in_date = '${startdate}') OR (re.check_out_date IS NOT NULL AND re.check_in_date <= '${startdate}' AND re.check_out_date >= '${startdate}')) GROUP BY r.room_id
            ) nt ON r.room_id = nt.room_id GROUP BY r.room_id`
    } else {
        sql = `SELECT r.*, (r.room_quantity - IFNULL(nt.booked, 0)) as available FROM rooms r LEFT JOIN (
            SELECT r.room_id, SUM(re.amount) as booked FROM rooms r LEFT JOIN reservations re ON (r.room_id = re.room_id) WHERE ((re.check_out_date IS NULL AND re.check_in_date >= '${startdate}' AND re.check_in_date <= '${enddate}') OR (re.check_out_date IS NOT NULL AND re.check_in_date <= '${enddate}' AND re.check_out_date >= '${startdate}')) GROUP BY r.room_id
            ) nt ON r.room_id = nt.room_id GROUP BY r.room_id`
    }
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
module.exports.deteteRoom = function (selected:Array<any>, callback: any) {
    var sql1 = `DELETE FROM reservations WHERE room_id IN ( ${selected.join()} );`
    var sql2 = `DELETE FROM rooms WHERE room_id IN ( ${selected.join()} );`
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
