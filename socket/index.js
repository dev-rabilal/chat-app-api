const io = require('socket.io')(7001, {
    cors: {
        origin: 'http://localhost:5173'
    }
})
let users = []
const setUser = (socketId, userId) => {
    !users.some(u => u?.userId === userId) &&
        users.push({ socketId, userId })
}
const removeUser = (sokId) => {
    users = users.filter(u => u.socketId !== sokId)
}
io.on('connection', (socket) => {
    console.log('someone connected!');

    socket.on('addUser', (userId) => {
        setUser(socket.id, userId)
        io.emit('getAllUsers', users)
    })
    socket.on('disconnect', () => {
        console.log('a user disconnected')
        removeUser(socket.id)
        io.emit('getAllUsers', users)
    })
});