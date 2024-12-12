const Device = require('../models/device');
const { errors } = require('../utils/errors');

class DeviceService {
    // Get all devices
    static async getAllDevices() {
        try {
            return await Device.find();
        } catch (error) {
            console.error('Database Error:', error);
            throw errors.DatabaseError('Failed to fetch devices');
        }
    }

    // Get a single device by ID
    static async getDeviceById(id) {
        try {
            const device = await Device.findById(id);
            if (!device) {
                throw errors.NotFoundError('Device not found');
            }
            return device;
        } catch (error) {
            if (error.name === 'CastError') {
                console.error('Validation Error: Invalid device ID format', error);
                throw errors.ValidationError('Invalid device ID format');
            }
            console.error('Database Error:', error);
            throw errors.DatabaseError('Failed to fetch device');
        }
    }

    // Create a new device
    static async createDevice(deviceData) {
        try {
            const device = new Device(deviceData);
            return await device.save();
        } catch (error) {
            console.error('Validation Error:', error);
            if (error.name === 'ValidationError') {
                throw errors.ValidationError(`Invalid device data: ${error.message}`);
            }
            throw errors.DatabaseError('Failed to create device');
        }
    }

    // Update a device
    static async updateDevice(id, updatedData) {
        try {
            const updatedDevice = await Device.findByIdAndUpdate(id, updatedData, { 
                new: true, 
                runValidators: true // Ensure Mongoose schema validation is applied
            });
            if (!updatedDevice) {
                throw errors.NotFoundError('Device not found');
            }
            return updatedDevice;
        } catch (error) {
            if (error.name === 'CastError') {
                console.error('Validation Error: Invalid device ID format', error);
                throw errors.ValidationError('Invalid device ID format');
            }
            if (error.name === 'ValidationError') {
                console.error('Validation Error:', error);
                throw errors.ValidationError(`Invalid device data: ${error.message}`);
            }
            console.error('Database Error:', error);
            throw errors.DatabaseError('Failed to update device');
        }
    }

    // Delete a device
    static async deleteDevice(id) {
        try {
            const deletedDevice = await Device.findByIdAndDelete(id);
            if (!deletedDevice) {
                throw errors.NotFoundError('Device not found');
            }
            return deletedDevice;
        } catch (error) {
            if (error.name === 'CastError') {
                console.error('Validation Error: Invalid device ID format', error);
                throw errors.ValidationError('Invalid device ID format');
            }
            console.error('Database Error:', error);
            throw errors.DatabaseError('Failed to delete device');
        }
    }
}

module.exports = DeviceService;