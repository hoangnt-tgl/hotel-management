var db = require('../connect')
var sendMail = require('./send-mail')
var bcrypt = require('bcryptjs');
var jwt = require("jsonwebtoken");

require('dotenv').config();

const SECRET = process.env.SECRET;
// const BASE_URL = process.env.BASE_URL;


var db = require('../connect')

export class User {
    email: string = ''
    fname: string = ''
    lname: string = ''
    verified: number = 0
    verification_hash: string = ''
    dob: string = ''
    phone: string = ''
    admin: number = 0
    password: string = ''
    created: string = new Date().getTime().toString()
    image: string = 'default_user.jpg'

    constructor(image:string, email:string, fname:string, lname:string, verified:number, verification_hash:string, dob:string, phone:string, admin:number, password:string) {
        this.email = email
        this.fname = fname
        this.lname = lname
        this.verified = verified
        this.verification_hash = verification_hash
        this.dob = dob
        this.admin = admin
        this.phone = phone
        this.password = password
    }
    createUser = function (newCustomer: User, callback: any) {
        bcrypt.genSalt(10, function (err:any, salt:any) {
            bcrypt.hash(newCustomer.password, salt, function (err:any, hash:string) {
              
                newCustomer.password = hash;
                var sql = `INSERT INTO users (user_email, user_fname, user_lname, user_password, user_admin) 
                VALUES ('${newCustomer.email}', '${newCustomer.fname}', '${newCustomer.lname}', '${newCustomer.password}', '${newCustomer.admin}');`
                db.connectDB(function (err:any, connect:any) {
                    if (err) callback(err, null)
                    else {
                        connect.query(sql, callback);
                        db.disconnectDB(connect)
                    }
                })
            });
        });
    }
    // updateRoom = function (id: number, newRoom: Room, callback: any) {
    //     var sql = `UPDATE rooms SET room_image = '${newRoom.image}', room_description = '${newRoom.description}', room_type = '${newRoom.type}', room_quantity = ${newRoom.quantity}, room_price = ${newRoom.price} WHERE (room_id = ${id});`
    //     db.connectDB(function (err: any, connect: any) {
    //         if (err) callback(err, null)
    //         else {
    //             connect.query(sql, callback);
    //             db.disconnectDB(connect)
    //         }
    //     })
    // }
}
// const SendMailForNewUser = (email, username, token) => {
//     let subject = 'Welcome to Shopping With Evalley'
//     let body = `<h1>Welcome to Shopping With Evalley</h1>
//             <p>Your account has been created</p>
//             <p>Username: ${username}</p>
//             <p>Please click <a href="${BASE_URL}activate/${username}/${token}">here</a> to verify your account</p>`
//     sendMail.sendMail(email, subject, body, (error, info) => {
//         if (error) {
//             console.log(error)
//         }
//         else {
//             console.log('Email sent: ' + info.response);
//         }
//     })
// }




module.exports.getUserByEmail = function (email:string, callback:any) {
    var sql = `SELECT * from users WHERE user_email = '${email}'`
    db.connectDB(function (err:any, connect:any) {
        if (err) callback(err, null)
        else {
            connect.query(sql, callback);
            db.disconnectDB(connect)
        }
    })
}

module.exports.getUserById = function (id:number, callback:any) {
    var sql = `SELECT * from users WHERE user_id = ${id}`
    db.connectDB(function (err:any, connect:any) {
        if (err) callback(err, null)
        else {
            connect.query(sql, callback);
            db.disconnectDB(connect)
        }
    })
}


module.exports.getAllUser = function (callback:any) {
    var sql = `SELECT * from users`
    db.connectDB(function (err:any, connect:any) {
        if (err) callback(err, null)
        else {
            connect.query(sql, callback);
            db.disconnectDB(connect)
        }
    })
}

var checkToken = function (token:string) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, SECRET, function (err:any, decoded:any) {
            if (err) {
                reject(err);
            }
            else {
                resolve(decoded);
            }
        })
    })
}

module.exports.checkLogin = async function (req:any, res:any, next:any) {
    if (!req.headers.authorization || !(req.headers.authorization.split(" ")[0] === "Basic")) {
        res.status(401).json({
            auth: false, message: 'No token found.'
        });
    }
    else {
        try {
            var decode = await checkToken(req.headers.authorization.split(" ")[1])
            req.user = decode
            next();
        } catch(err) {
            res.status(401).json({ auth: false, message: 'Failed to authenticate token.' });
        }
    }
}


module.exports.comparePassword = function (candidatePassword:string, hash:string, callback:any) {
    bcrypt.compare(candidatePassword, hash, function (err:any, isMatch:boolean) {
        if (err) throw err;
        callback(null, isMatch);
    });
}

module.exports.deleteUser = function (selected:Array<any>, callback:any) {
    var sql1 = `DELETE FROM reservations WHERE user_id IN ( ${selected.join()} );`
    var sql2 = `DELETE FROM users WHERE user_id IN ( ${selected.join()} );`
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



