const db = require('../db')

const getUserController = (req, res) => {
    db.query(`SELECT * FROM users WHERE mobile_number = ${req.user.mobile_number}`, (err, result) => {
        if (err) {
            console.log('error:' + err)
            return res.status(500).json({
                error: 'internal server error.',
            })
        }
        return res.status(200).json({
            id: result[0]['user_id'],
            email: result[0]['email'],
            username: result[0]['username'],
            mobile_number: result[0]['mobile_number']
        })
    })
}

module.exports = getUserController