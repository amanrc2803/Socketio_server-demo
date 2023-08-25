const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const port = process.env.PORT || 3000;

// Serve static files (you can place your app files in a folder named "public")
app.use(express.static(__dirname + '/public'));

// Socket.IO connection event
io.on('connection', (socket) => {
    console.log('A user connected');

    // Simulate sending real-time data at intervals
    const interval = setInterval(() => {
        const randomValue = Math.random();
        socket.emit('data', randomValue); // Send data to the connected client
    }, 1000);

    // Disconnect event
    socket.on('disconnect', () => {
        console.log('A user disconnected');
        clearInterval(interval);
    });
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
