
var mysql = require('mysql')

const HOST = process.env.HOST 
const USER = process.env.USER 
const PASS = process.env.PASS 
const DATABASE = process.env.DATABASE

// const HOST = "34.132.211.254"
// const USER = "root"
// const PASS = "hoang1234"
// const DATABASE = "HotelReservation"

module.exports.connectDB = function (callback:any){
    const conn = mysql.createConnection({
        host: HOST,
        user: USER,
        password: PASS,
        database: DATABASE
    });

    conn.connect(function (err:any) {
        if (err) {
            callback(err, null)
        } else {
            callback(null, conn)
        }
    })

}

module.exports.disconnectDB = function (conn:any) {
    conn.end();
}


