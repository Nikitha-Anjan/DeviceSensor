const device = require('../models/device');
const { errors } = require('../utils/errors');

class ValidationService {
    // Validate device data
    static validateDeviceData(deviceData) {
        const { type, name, sensors } = deviceData;

        // Validate device type
        if (!type || !['car', 'fridge', 'thermostat', 'industrial machine'].includes(type)) {
            throw errors.ValidationError('Invalid device type');
        }

        // Validate device name
        if (!name || name.trim().length < 3) {
            throw errors.ValidationError('Device name must be at least 3 characters long');
        }

        // Validate sensors
        if (!Array.isArray(sensors) || sensors.length === 0) {
            throw errors.ValidationError('Device must have at least one sensor');
        }

        sensors.forEach((sensor) => {
            // Validate sensor name
            if (!sensor.name || sensor.name.trim().length < 3) {
                throw errors.ValidationError('Sensor name must be at least 3 characters long');
            }
            // Validate sensor value
            if (sensor.value === undefined || sensor.value === null) {
                throw errors.ValidationError('Sensor value is required');
            }
        });
    }
}

module.exports = ValidationService;