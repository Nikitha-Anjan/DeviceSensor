const DeviceService = require('../services/deviceService');
const ValidationService = require('../services/validationService');
const { AppError } = require('../utils/errors');
const mongoose = require('mongoose');

// Get all devices
exports.getDevices = async (req, res, next) => {
    try {
        const devices = await DeviceService.getAllDevices();
        res.status(200).json({
            status: 'success',
            data: devices
        });
    } catch (error) {
        next(error); // Pass error to global error handler
    }
};

// Get a single device by ID
exports.getDeviceById = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw new AppError('Device ID is required', 400);
        }
        if (!mongoose.isValidObjectId(id)) {
            throw new AppError('Invalid device ID format', 400);
        }

        const device = await DeviceService.getDeviceById(id);
        res.status(200).json({
            status: 'success',
            data: device
        });
    } catch (error) {
        next(error); // Pass error to global error handler
    }
};

// Create a new device
exports.createDevice = async (req, res, next) => {
    try {
        if (!req.body) {
            throw new AppError('Request body is required', 400);
        }

        ValidationService.validateDeviceData(req.body); // Validate input
        const device = await DeviceService.createDevice(req.body); // Create device
        res.status(201).json({
            status: 'success',
            data: device
        });
    } catch (error) {
        next(error); // Pass error to global error handler
    }
};

// Update a device
exports.updateDevice = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw new AppError('Device ID is required', 400);
        }
        if (!mongoose.isValidObjectId(id)) {
            throw new AppError('Invalid device ID format', 400);
        }
        if (!req.body) {
            throw new AppError('Request body is required', 400);
        }

        ValidationService.validateDeviceData(req.body); // Validate input
        const updatedDevice = await DeviceService.updateDevice(id, req.body); // Update device
        res.status(200).json({
            status: 'success',
            data: updatedDevice
        });
    } catch (error) {
        next(error); // Pass error to global error handler
    }
};

//  Delete a device
exports.deleteDevice = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw new AppError('Device ID is required', 400);
        }
        if (!mongoose.isValidObjectId(id)) {
            throw new AppError('Invalid device ID format', 400);
        }

        const deletedDevice = await DeviceService.deleteDevice(id); // Delete device
        res.status(200).json({
            status: 'success',
            message: 'Device deleted successfully',
            data: deletedDevice
        });
    } catch (error) {
        next(error); // Pass error to global error handler
    }
};

// Global Error Handler Middleware
exports.globalErrorHandler = (err, req, res, next) => {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
    } else {
        console.error('Unexpected Error:', err.stack); // Log the stack trace
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong'
        });
    }
};