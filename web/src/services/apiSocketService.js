import { io } from 'socket.io-client';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';
let socket;

const apiSocketService = {
    
    connectSocket: () => {
        if (!socket) {
            const SOCKET_URL = API_URL.replace('/api', ''); // Remove `/api` from the URL for WebSocket
            socket = io(SOCKET_URL); // Connect to the WebSocket server
            console.log('WebSocket connected');
        }
    },
    disconnectSocket: () => {
        if (socket) {
            socket.off('sensorUpdate'); // Remove event listener
            socket.disconnect();
            console.log('WebSocket disconnected');
            socket = null;
        }
    },

    onSensorUpdate: (callback) => {
        if (!socket) {
            console.warn('Socket not connected');
            return;
        }
        socket.on('sensorUpdate', (updatedDevice) => {
            console.log('Real-time sensor update received:', updatedDevice);
            callback(updatedDevice);
        });
    },

    onDeviceAdd: (callback) => {
        if (socket) {
            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.type === 'device-add') {
                    callback(data.payload);
                }
            };
        }
    },

    onDeviceDelete: (callback) => {
        if (socket) {
            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.type === 'device-delete') {
                    callback(data.payload); // Pass the deleted device ID
                }
            };
        }
    },

    getDevices: async () => {
        try {
            const response = await fetch(`${API_URL}/devices`);
            if (!response.ok) {
                throw new Error(`Failed to fetch devices: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching devices:', error.message);
            throw error;
        }
    },

    getDeviceById: async (id) => {
        try {
            const response = await fetch(`${API_URL}/devices/${id}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch device with ID ${id}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Error fetching device with ID ${id}:`, error.message);
            throw error;
        }
    },

    createDevice: async (device) => {
        try {
            const response = await fetch(`${API_URL}/devices`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(device),
            });
            if (!response.ok) {
                throw new Error(`Failed to create device: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error creating device:', error.message);
            throw error;
        }
    },

    updateDevice: async (id, updatedDevice) => {
        try {
            const response = await fetch(`${API_URL}/devices/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedDevice),
            });
            if (!response.ok) {
                throw new Error(`Failed to update device with ID ${id}: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Error updating device with ID ${id}:`, error.message);
            throw error;
        }
    },

    deleteDevice: async (id) => {
        try {
            const response = await fetch(`${API_URL}/devices/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error(`Failed to delete device with ID ${id}: ${response.statusText}`);
            }
        } catch (error) {
            console.error(`Error deleting device with ID ${id}:`, error.message);
            throw error;
        }
    },
};

export default apiSocketService;