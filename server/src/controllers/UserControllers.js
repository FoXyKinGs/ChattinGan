const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { modelCheckEmail, modelRegister, modelUsers } = require('../models/UserModel')

module.exports = {
    userRegister: (req, res) => {
        const body = req.body

        // Generate random number with year, month, day, hour, minute, second, milisecond and Math random method
        let timestamp = new Date().getUTCMilliseconds();
        let now = new Date();
        timestamp = now.getFullYear().toString()
        timestamp += (now.getMonth < 9 ? '0' : '') + now.getMonth().toString()
        timestamp += ((now.getDate < 10) ? '0' : '') + now.getDate().toString()
        timestamp += (now.getHours().toString())
        timestamp += (now.getMinutes().toString())
        timestamp += (now.getSeconds().toString())
        timestamp += (now.getMilliseconds().toString())
        timestamp += (Math.floor(Math.random() * 100).toString())
        //--------------------------------------------

        modelCheckEmail(body.email)
            .then(async response => {
                if (response.rowCount === 1) {
                    res.status(500).send('Email Registered')
                } else {
                    const salt = await bcrypt.genSalt(10)
                    const password = await bcrypt.hash(body.password, salt)

                    const data = {
                        room_id: timestamp,
                        username: body.username,
                        email: body.email,
                        password
                    }

                    modelRegister(data)
                        .then(response => {
                            res.status(200).send('Register Success')
                        })
                        .catch(err => {
                            console.log(err)
                            res.status(500).send('Register Failed')
                        })
                }
            })
            .catch(err => {
                res.status(500).send('Internal Server Error')
            })
    },
    userLogin: (req, res) => {
        const body = req.body
        modelCheckEmail(body.email)
            .then(async response => {
                if (response.rowCount === 1) {
                    const checkPassword = await bcrypt.compare(body.password, response.rows[0].password)

                    if (checkPassword) {
                        const dataUser = {
                            id: response.rows[0].id,
                            room_id: response.rows[0].room_id,
                            username: response.rows[0].username,
                            email: response.rows[0].email,
                        }

                        const token = jwt.sign(dataUser, process.env.JWT_SECRET)
                        const data = {token, dataUser}

                        res.status(200).send(data)
                    } else {
                        res.status(400).send('Wrong Password')
                    }
                } else{
                    res.status(400).send(`Email didn't registered`)
                }
            })
            .catch(err => {
                res.status(500).send('Internal Server Error')
            })
    },
    getUsers: (req, res) => {
        const params = req.params
        modelUsers(params.id)
            .then(response => {
                res.status(200).send({
                    status: 200,
                    data: response.rows
                })
            })
            .catch(err => {
                res.status(500).send('Internal Server Error')
            })
    }
}