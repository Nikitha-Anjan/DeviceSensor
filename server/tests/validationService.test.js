const ValidationService = require('../services/validationService');
const { errors, AppError } = require('../utils/errors');

describe('🔍 Validation Service Tests', () => {

    // ✅ Test: Valid device data passes validation
    it('should pass validation for a valid device data', () => {
        const validDeviceData = {
            type: 'car',
            name: 'Valid Car',
            sensors: [
                { name: 'Battery Level', value: '90%' },
                { name: 'Engine Temperature', value: '75°C' },
            ],
        };

        expect(() => ValidationService.validateDeviceData(validDeviceData)).not.toThrow();
    });

    // ✅ Test: Should throw an error if type is missing
    it('should throw an error if device type is missing', () => {
        const invalidDeviceData = {
            name: 'Valid Car',
            sensors: [{ name: 'Battery Level', value: '90%' }],
        };

        expect(() => ValidationService.validateDeviceData(invalidDeviceData))
            .toThrow(new AppError('Invalid device type', 400));
    });

    // ✅ Test: Should throw an error if type is not a valid enum
    it('should throw an error if device type is not a valid type', () => {
        const invalidDeviceData = {
            type: 'spaceship',
            name: 'Invalid Type Device',
            sensors: [{ name: 'Battery Level', value: '90%' }],
        };

        expect(() => ValidationService.validateDeviceData(invalidDeviceData))
            .toThrow(new AppError('Invalid device type', 400));
    });

    // ✅ Test: Should throw an error if name is missing
    it('should throw an error if device name is missing', () => {
        const invalidDeviceData = {
            type: 'car',
            sensors: [{ name: 'Battery Level', value: '90%' }],
        };

        expect(() => ValidationService.validateDeviceData(invalidDeviceData))
            .toThrow(new AppError('Device name must be at least 3 characters long', 400));
    });

    // ✅ Test: Should throw an error if name is less than 3 characters
    it('should throw an error if device name is less than 3 characters', () => {
        const invalidDeviceData = {
            type: 'car',
            name: 'AB',
            sensors: [{ name: 'Battery Level', value: '90%' }],
        };

        expect(() => ValidationService.validateDeviceData(invalidDeviceData))
            .toThrow(new AppError('Device name must be at least 3 characters long', 400));
    });

    // ✅ Test: Should throw an error if sensors array is missing
    it('should throw an error if sensors array is missing', () => {
        const invalidDeviceData = {
            type: 'car',
            name: 'Valid Car',
        };

        expect(() => ValidationService.validateDeviceData(invalidDeviceData))
            .toThrow(new AppError('Device must have at least one sensor', 400));
    });

    // ✅ Test: Should throw an error if sensors array is empty
    it('should throw an error if sensors array is empty', () => {
        const invalidDeviceData = {
            type: 'car',
            name: 'Valid Car',
            sensors: [],
        };

        expect(() => ValidationService.validateDeviceData(invalidDeviceData))
            .toThrow(new AppError('Device must have at least one sensor', 400));
    });

    // ✅ Test: Should throw an error if sensor name is missing
    it('should throw an error if sensor name is missing', () => {
        const invalidDeviceData = {
            type: 'car',
            name: 'Valid Car',
            sensors: [{ value: '90%' }],
        };

        expect(() => ValidationService.validateDeviceData(invalidDeviceData))
            .toThrow(new AppError('Sensor name must be at least 3 characters long', 400));
    });

    // ✅ Test: Should throw an error if sensor name is less than 3 characters
    it('should throw an error if sensor name is less than 3 characters', () => {
        const invalidDeviceData = {
            type: 'car',
            name: 'Valid Car',
            sensors: [{ name: 'AB', value: '90%' }],
        };

        expect(() => ValidationService.validateDeviceData(invalidDeviceData))
            .toThrow(new AppError('Sensor name must be at least 3 characters long', 400));
    });

    // ✅ Test: Should throw an error if sensor value is missing
    it('should throw an error if sensor value is missing', () => {
        const invalidDeviceData = {
            type: 'car',
            name: 'Valid Car',
            sensors: [{ name: 'Battery Level' }],
        };

        expect(() => ValidationService.validateDeviceData(invalidDeviceData))
            .toThrow(new AppError('Sensor value is required', 400));
    });

    // ✅ Test: Should throw an error if sensor value is null
    it('should throw an error if sensor value is null', () => {
        const invalidDeviceData = {
            type: 'car',
            name: 'Valid Car',
            sensors: [{ name: 'Battery Level', value: null }],
        };

        expect(() => ValidationService.validateDeviceData(invalidDeviceData))
            .toThrow(new AppError('Sensor value is required', 400));
    });

    // ✅ Test: Should throw an error if sensor value is undefined
    it('should throw an error if sensor value is undefined', () => {
        const invalidDeviceData = {
            type: 'car',
            name: 'Valid Car',
            sensors: [{ name: 'Battery Level', value: undefined }],
        };

        expect(() => ValidationService.validateDeviceData(invalidDeviceData))
            .toThrow(new AppError('Sensor value is required', 400));
    });

    // ✅ Test: Valid data with multiple sensors
    it('should pass validation for a device with multiple sensors', () => {
        const validDeviceData = {
            type: 'fridge',
            name: 'Kitchen Fridge',
            sensors: [
                { name: 'Temperature Sensor', value: '-2°C' },
                { name: 'Humidity Sensor', value: '50%' },
                { name: 'Ice Level', value: '20%' }
            ],
        };

        expect(() => ValidationService.validateDeviceData(validDeviceData)).not.toThrow();
    });

    // ✅ Test: Should throw an error if type, name, and sensors are all missing
    it('should throw an error if type, name, and sensors are all missing', () => {
        const invalidDeviceData = {};

        expect(() => ValidationService.validateDeviceData(invalidDeviceData))
            .toThrow(new AppError('Invalid device type', 400));
    });

    // ✅ Test: Should throw a validation error if sensors array contains an invalid sensor
    it('should throw an error if one of the sensors has invalid data', () => {
        const invalidDeviceData = {
            type: 'car',
            name: 'Valid Car',
            sensors: [
                { name: 'Battery Level', value: '90%' },
                { name: 'A', value: '50%' }, // Invalid sensor name
            ],
        };

        expect(() => ValidationService.validateDeviceData(invalidDeviceData))
            .toThrow(new AppError('Sensor name must be at least 3 characters long', 400));
    });

    // ✅ Test: Validation works for edge cases
    it('should throw an error for unexpected edge cases', () => {
        const invalidDeviceData = {
            type: null,
            name: '',
            sensors: [
                { name: '', value: '' }
            ],
        };

        expect(() => ValidationService.validateDeviceData(invalidDeviceData))
            .toThrow(new AppError('Invalid device type', 400));
    });

});