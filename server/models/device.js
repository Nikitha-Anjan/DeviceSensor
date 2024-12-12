const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Sensor name is required'],
        trim: true,
        minlength: [3, 'Sensor name must be at least 3 characters long'],
    },
    value: {
        type: mongoose.Schema.Types.Mixed,
        required: [true, 'Sensor value is required'],
        validate: {
            validator: function (v) {
                return v !== null && v !== undefined && (typeof v === 'string' || typeof v === 'number'); // Ensure value is string or number
            },
            message: (props) => `Sensor value must be a string or number, but got ${typeof props.value}`,
        },
    },
});

const deviceSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            required: [true, 'Device type is required'],
            enum: ['car', 'fridge', 'thermostat', 'industrial machine'], // Allowed device types
        },
        name: {
            type: String,
            required: [true, 'Device name is required'],
            trim: true,
            unique: true,
            index: true, // Create a unique index on name
        },
        sensors: {
            type: [sensorSchema],
            validate: {
                validator: function (v) {
                    return Array.isArray(v) && v.length > 0; // Ensure it's an array and has at least one sensor
                },
                message: 'Device must have at least one sensor',
            },
        },
    },
    { 
        timestamps: true // Automatically add createdAt and updatedAt timestamps
    }
);

// Handling unique constraint error for name
deviceSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
        next(new Error('Device name must be unique. Duplicate value found.'));
    } else {
        next(error);
    }
});

// Export the model
module.exports = mongoose.model('Device', deviceSchema);