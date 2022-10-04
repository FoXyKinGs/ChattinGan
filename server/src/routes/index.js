const express = require('express')
const router = express.Router()
const { userRegister, userLogin, getUsers } = require('../controllers/UserControllers')
const { authentication } = require('../middlewares/auth')

router
    .post('/register', userRegister)
    .post('/login', userLogin)
    .get('/users/:id', authentication, getUsers)

module.exports = router