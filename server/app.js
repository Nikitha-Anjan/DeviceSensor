const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const deviceRoutes = require('./routes/devices');
const http = require('http');
const { Server } = require('socket.io');
const { globalErrorHandler } = require('./controllers/deviceController');
const connectDB = require('./db');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000', // Replace with your frontend URL
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    },
});

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/devices', deviceRoutes);
app.use(globalErrorHandler);

// WebSocket Event Handlers
io.on('connection', (socket) => {
    console.log('WebSocket connected:', socket.id);

    socket.on('error', (err) => {
        console.error(`WebSocket error on ${socket.id}:`, err);
    });

    socket.on('disconnect', () => {
        console.log('WebSocket disconnected:', socket.id);
    });
});

// Real-Time Updates
setInterval(async () => {
    try {
        const devices = await mongoose.model('Device').find();
        if (devices.length > 0) {
            const randomDevice = devices[Math.floor(Math.random() * devices.length)];
            randomDevice.sensors.forEach((sensor) => {
                sensor.value = `${Math.floor(Math.random() * 100)}`;
            });
            io.emit('sensorUpdate', randomDevice);
            console.log(`Real-time update for device: ${randomDevice.name}`);
        }
    } catch (error) {
        console.error('Error in real-time updates:', error);
    }
}, 5000);

// Start the server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = io;