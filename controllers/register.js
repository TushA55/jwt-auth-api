const db = require('../db')
const bcrypt = require('bcryptjs')

const registerController = (req, res) => {
    username = req.body.username;
    mobile_number = req.body.mobile_number;
    email = req.body.email;
    password = req.body.password;

    if (!mobile_number || !password) {
        res.status(400).json({
            error: 'invalid mobile number or password.',
        })
        return;
    }

    db.query(`SELECT * FROM users WHERE mobile_number = LOWER(${db.escape(mobile_number)})`, (err, result) => {
        if (err) {
            console.log('error:' + err)
            res.status(500).json({
                error: 'internal server error.',
            })
            return;
        }
        if (result.length) {
            res.status(409).json({
                error: 'user already exists.',
            })
            return;
        } else {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    console.log('error:' + err)
                    res.status(500).json({
                        error: 'can\'t create user. please try again later',
                    })
                    return;
                }
                db.query(`INSERT INTO users (username, mobile_number, email, password) VALUES (${db.escape(username)},${db.escape(mobile_number)},${db.escape(email)}, ${db.escape(hash)})`, (err, result) => {
                    if (err) {
                        console.log('error:' + err)
                        res.status(500).json({
                            error: 'can\'t create user. please try again later',
                        })
                        return;
                    } else {
                        res.status(201).json({
                            message: 'user created.',
                            user_id: result.insertId
                        })
                        return;
                    }
                })
            })
        }
    })
}

module.exports = registerController