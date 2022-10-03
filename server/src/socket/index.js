const socketio = require('socket.io')

module.exports = (server) => {
    const io = socketio(server, {
        cors: {
            origin: '*'
        }
    })
}