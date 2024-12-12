const DeviceService = require('../services/deviceService');
const Device = require('../models/device');
const mongoose = require('mongoose');
const { errors, AppError } = require('../utils/errors');
require('./setupTest');

describe('🔍 Device Service Tests', () => {

    // Clean up the devices collection before each test
    beforeEach(async () => {
        await Device.deleteMany({});
    });

    // Close the Mongoose connection after all tests have run
    afterAll(async () => {
        await mongoose.connection.close();
    });

    // ✅ Test: Create a new device
    it('should create a new device', async () => {
        const deviceData = {
            type: 'car',
            name: 'Service Car',
            sensors: [{ name: 'Battery Level', value: '90%' }],
        };

        const device = await DeviceService.createDevice(deviceData);
        
        expect(device).toHaveProperty('_id'); // Ensure an ID is created
        expect(device.name).toBe('Service Car');
        expect(device.type).toBe('car');
        expect(device.sensors[0].name).toBe('Battery Level');
        expect(device.sensors[0].value).toBe('90%');
    });

    // ✅ Test: Retrieve all devices
    it('should retrieve all devices', async () => {
        await DeviceService.createDevice({
            type: 'car',
            name: 'Service Car',
            sensors: [{ name: 'Battery Level', value: '90%' }],
        });

        await DeviceService.createDevice({
            type: 'fridge',
            name: 'Kitchen Fridge',
            sensors: [{ name: 'Temperature', value: '-5°C' }],
        });

        const devices = await DeviceService.getAllDevices();

        expect(devices.length).toBe(2);

        const deviceNames = devices.map(device => device.name);
        expect(deviceNames).toContain('Service Car');
        expect(deviceNames).toContain('Kitchen Fridge');
    });

    // ✅ Test: Retrieve a device by ID
    it('should retrieve a device by ID', async () => {
        const deviceData = await DeviceService.createDevice({
            type: 'car',
            name: 'Service Car',
            sensors: [{ name: 'Battery Level', value: '90%' }],
        });

        const device = await DeviceService.getDeviceById(deviceData._id);

        expect(device.name).toBe('Service Car');
        expect(device._id.toString()).toBe(deviceData._id.toString()); // Ensure ObjectId matches
    });

    // ✅ Test: Should throw an error if device ID is invalid
    it('should throw an error for invalid device ID format', async () => {
        await expect(DeviceService.getDeviceById('invalid-id'))
            .rejects
            .toThrow(new AppError('Invalid device ID format', 400));
    });

    // ✅ Test: Should throw a not found error for non-existent device
    it('should throw a not found error when device does not exist', async () => {
        const nonExistentId = new mongoose.Types.ObjectId(); 
        await expect(DeviceService.getDeviceById(nonExistentId))
            .rejects
            .toThrow(new AppError('Failed to fetch device', 404));
    });

    // ✅ Test: Update a device
    it('should update a device', async () => {
        const deviceData = await DeviceService.createDevice({
            type: 'car',
            name: 'Service Car',
            sensors: [{ name: 'Battery Level', value: '90%' }],
        });

        const updatedDevice = await DeviceService.updateDevice(deviceData._id, {
            name: 'Updated Service Car',
            sensors: [{ name: 'Battery Level', value: '85%' }]
        });

        expect(updatedDevice.name).toBe('Updated Service Car');
        expect(updatedDevice.sensors[0].value).toBe('85%');
    });

    // ✅ Test: Update with invalid device ID
    it('should throw an error for invalid device ID format on update', async () => {
        await expect(DeviceService.updateDevice('invalid-id', {
            name: 'Updated Device',
        })).rejects.toThrow(new AppError('Invalid device ID format', 400));
    });

    // ✅ Test: Update a non-existent device
    it('should throw a not found error when updating a non-existent device', async () => {
        const fakeId = new mongoose.Types.ObjectId(); 
        await expect(DeviceService.updateDevice(fakeId, {
            name: 'Updated Device',
        })).rejects.toThrow(new AppError('Failed to update device', 404));
    });

    // ✅ Test: Throw validation error when updating with invalid data
    it('should throw a validation error when updating with invalid data', async () => {
        const deviceData = await DeviceService.createDevice({
            type: 'car',
            name: 'Service Car',
            sensors: [{ name: 'Battery Level', value: '90%' }],
        });

        await expect(DeviceService.updateDevice(deviceData._id, {
            type: 'invalid-device-type'
        })).rejects.toThrow(new AppError('Invalid device data: Validation failed: type: `invalid-device-type` is not a valid enum value for path `type`.', 400));
    });

    // ✅ Test: Delete a device
    it('should delete a device', async () => {
        const deviceData = await DeviceService.createDevice({
            type: 'car',
            name: 'Service Car',
            sensors: [{ name: 'Battery Level', value: '90%' }],
        });

        const deletedDevice = await DeviceService.deleteDevice(deviceData._id);
        
        expect(deletedDevice.name).toBe('Service Car');
        
        const devices = await DeviceService.getAllDevices();
        expect(devices.length).toBe(0); // The database should be empty after delete
    });

    // ✅ Test: Delete a non-existent device
    it('should throw a not found error when deleting a non-existent device', async () => {
        const fakeId = new mongoose.Types.ObjectId(); 
        await expect(DeviceService.deleteDevice(fakeId))
            .rejects
            .toThrow(new AppError('Failed to delete device', 404));
    });

    // ✅ Test: Delete with invalid device ID
    it('should throw an error for invalid device ID format on delete', async () => {
        await expect(DeviceService.deleteDevice('invalid-id'))
            .rejects
            .toThrow(new AppError('Invalid device ID format', 400));
    });
});