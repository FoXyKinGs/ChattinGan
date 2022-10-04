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
    modelUsers: (id) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT * FROM users WHERE id != ${id}`, (err, response) => {
                if (err) {
                    reject(new Error(err))
                } else {
                    resolve(response)
                }
            })
        })
    },
    modelGetChat: (data) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT chat.id, chat.from_id, chat.to_id, chat.message FROM chat LEFT JOIN users ON chat.from_id::VARCHAR = users.id::VARCHAR LEFT JOIN users AS user_to ON chat.to_id::VARCHAR = user_to.id::VARCHAR WHERE (from_id='${data.id_to}' AND to_id='${data.id_from}') OR (from_id='${data.id_from}' AND to_id='${data.id_to}') ORDER BY chat.id ASC`, (err, response) => {
                if(err){
                    reject(new Error(err))
                }else{
                    resolve(response)
                }
            })
        })
    },
}