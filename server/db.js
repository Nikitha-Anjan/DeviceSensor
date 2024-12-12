const mongoose = require('mongoose');

const connectDB = async () => {
    const uri = process.env.MONGO_URI || 'mongodb://mongo:27017/iot-platform';
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;