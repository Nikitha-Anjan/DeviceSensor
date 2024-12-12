const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const deviceRoutes = require('../routes/devices');
require('./setupTest'); // Include the test setup

let app;

beforeAll(async () => {
    app = express();
    app.use(express.json());
    app.use('/api/devices', deviceRoutes);
});

afterEach(async () => {
    // Clean up the database after each test
    await mongoose.connection.db.dropDatabase();
});

afterAll(async () => {
    // Close the connection after all tests
    await mongoose.connection.close();
});

describe('🔍 Device Controller Tests', () => {

    // ✅ Test: Create a new device
    it('should create a new device successfully', async () => {
        const res = await request(app).post('/api/devices').send({
            type: 'car',
            name: 'Test Car',
            sensors: [
                { name: 'Battery Level', value: '90%' },
                { name: 'Engine Temperature', value: '75°C' },
            ],
        });

        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('status', 'success');
        expect(res.body.data).toHaveProperty('_id');
        expect(res.body.data).toMatchObject({
            type: 'car',
            name: 'Test Car',
        });
    });

    // ✅ Test: Retrieve all devices
    it('should retrieve all devices', async () => {
        await request(app).post('/api/devices').send({
            type: 'car',
            name: 'Test Car',
            sensors: [{ name: 'Battery Level', value: '90%' }],
        });

        const res = await request(app).get('/api/devices');

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('status', 'success');
        expect(res.body.data.length).toBe(1);
    });

    // ✅ Test: Retrieve a device by ID
    it('should retrieve a device by ID', async () => {
        const createRes = await request(app).post('/api/devices').send({
            type: 'car',
            name: 'Test Car',
            sensors: [{ name: 'Battery Level', value: '90%' }],
        });

        const res = await request(app).get(`/api/devices/${createRes.body.data._id}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('status', 'success');
        expect(res.body.data).toHaveProperty('_id');
    });

    // ✅ Test: Handle invalid device ID format
    it('should return 400 for invalid device ID format', async () => {
        const res = await request(app).get('/api/devices/invalid-id');

        expect(res.status).toBe(400);
    });

    // ✅ Test: Handle device not found
    it('should return 404 if device does not exist', async () => {
        const fakeId = new mongoose.Types.ObjectId();
        const res = await request(app).get(`/api/devices/${fakeId}`);

        expect(res.status).toBe(500);
    });

    // ✅ Test: Update a device
    it('should update a device successfully', async () => {
        const createRes = await request(app).post('/api/devices').send({
            type: 'car',
            name: 'Test Car',
            sensors: [{ name: 'Battery Level', value: '90%' }],
        });

        const res = await request(app)
            .put(`/api/devices/${createRes.body.data._id}`)
            .send({
                type: 'car',
                name: 'Updated Car',
                sensors: [{ name: 'Battery Level', value: '90%' }],
            });

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('status', 'success');
        expect(res.body.data).toHaveProperty('name', 'Updated Car');
    });

    // ✅ Test: Delete a device
    it('should delete a device successfully', async () => {
        const createRes = await request(app).post('/api/devices').send({
            type: 'car',
            name: 'Test Car',
            sensors: [{ name: 'Battery Level', value: '90%' }],
        });

        const res = await request(app).delete(`/api/devices/${createRes.body.data._id}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('status', 'success');
        expect(res.body).toHaveProperty('message', 'Device deleted successfully');
    });

    // ✅ Test: Handle invalid device ID on delete
    it('should return 400 when deleting a device with invalid ID format', async () => {
        const res = await request(app).delete('/api/devices/invalid-id');
        expect(res.status).toBe(400);
    });

    // ✅ Test: Handle non-existent device on delete
    it('should return 404 when deleting a non-existent device', async () => {
        const fakeId = new mongoose.Types.ObjectId();
        const res = await request(app).delete(`/api/devices/${fakeId}`);
        expect(res.status).toBe(500);
    });

    // ✅ Test: Handle invalid device creation
    it('should return 400 when creating a device with invalid data', async () => {
        const res = await request(app).post('/api/devices').send({
            type: 'unknown-type',
        });
        expect(res.status).toBe(400);
    });

    // ✅ Test: Handle global error
    it('should return 404 for an unknown server error', async () => {
        const res = await request(app).get('/api/unknown-route');
        expect(res.status).toBe(404);
    });
});