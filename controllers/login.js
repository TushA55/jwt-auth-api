const db = require('../db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const loginController = (req, res) => {
    email_or_mobile_number = req.body.email_or_mobile_number;
    password = req.body.password;

    if (!email_or_mobile_number || !password) {
        res.status(400).json({
            error: 'invalid email or password.',
        })
        return;
    }

    db.query(`SELECT * FROM users WHERE mobile_number = LOWER(${db.escape(email_or_mobile_number)}) OR email = LOWER(${db.escape(email_or_mobile_number)})`, (err, result) => {
        if (err) {
            console.log('error:' + err)
            res.status(500).json({
                error: 'internal server error.',
            })
            return;
        }
        if (result.length) {
            bcrypt.compare(password, result[0]['password'], (err, isValid) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({
                        error: 'internal server error.',
                    })
                    return;
                }
                if (!isValid) {
                    res.status(400).json({
                        error: 'invalid email or password.',
                    })
                    return;
                }
                const token = jwt.sign({ id: result[0]['user_id'], email: result[0]['email'], mobile_number: result[0]['mobile_number'] }, process.env.SECRET, { expiresIn: '24h' })
                res.status(200).json({
                    message: 'login successfull',
                    token: token,
                })
                return;
            })
        } else {
            res.status(400).json({
                error: 'invalid email or password.',
            })
            return;
        }
    })
}

module.exports = loginController