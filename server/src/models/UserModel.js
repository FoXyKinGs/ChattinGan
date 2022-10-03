const conn = require('../database')

module.exports = {
    modelCheckEmail: (email) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT * FROM users WHERE email = '${email}'`, (err, response) => {
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(response)
                }
            })
        })
    },
    modelRegister: (data) => {
        const { room_id, username, email, password } = data
        return new Promise((resolve, reject) => {
            conn.query('INSERT INTO users (room_id, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *', [room_id, username, email, password], (err, response) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(response)
                }
            })
        })
    },
    modelUsers: () => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM users', (err, response) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(response)
                }
            })
        })
    }
}