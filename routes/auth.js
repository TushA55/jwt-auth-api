const authRouter = require('express').Router()
const registerController = require('../controllers/register')
const loginController = require('../controllers/login')
const getUserController = require('../controllers/get_user')
const verifyToken = require('../middlewares/auth')

authRouter.post('/register', registerController)
authRouter.post('/login', loginController)
authRouter.get('/get', verifyToken, getUserController)

module.exports = authRouter;