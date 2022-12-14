const socketio = require('socket.io')
const db = require('../database')
const { modelGetChat } = require('../models/UserModel')

module.exports = (server) => {
    const io = socketio(server, {
        cors: {
            origin: '*'
        }
    })

    io.on('connection', (socket) => {
        socket.on('join-room', (roomID) => {
            socket.join(roomID)
        })

        socket.on('get-chat', (user) => {
            modelGetChat(user).then((response) => {
                io.to(user.room_id).emit('res-get-chat', response)
            }).catch((err) => {
                console.log(err)
            })
        })

        socket.on('send-message', (msg) => {
            db.query(`INSERT INTO chat (from_id, to_id, message) VALUES ($1, $2, $3) RETURNING *`, [msg.from, msg.to, msg.msg], (err, result) => {
                db.query(`SELECT chat.from_id, chat.to_id, chat.message, user_from.username as from_name, user_from.room_id as from_room_id, user_to.room_id as to_room_id FROM chat LEFT JOIN users as user_from ON chat.from_id::VARCHAR = user_from.id::VARCHAR LEFT JOIN users as user_to ON chat.to_id::VARCHAR = user_to.id::VARCHAR WHERE (from_id='${msg.from}' AND to_id='${msg.to}') OR (from_id='${msg.to}' AND to_id='${msg.from}') ORDER BY chat.id ASC`, (err, result) => {
                    io.to(result.rows[0].from_room_id).emit('res-get-chat', result)
                    io.to(result.rows[0].to_room_id).emit('res-get-chat', result)
                })
            })
        })
    })
}