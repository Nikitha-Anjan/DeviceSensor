const API_URL = process.env.REACT_APP_API_URL;

const api = {
    /*getDevices: async () => {
        const response = await fetch(`${API_URL}/devices`);
        if (!response.ok) throw new Error('Failed to fetch devices');
        return await response.json();
    },*/
    getDevices: async () => {
        const response = await fetch(`${API_URL}/devices`);
        if (!response.ok) throw new Error('Failed to fetch devices');
        const data = await response.json();
        if (Array.isArray(data)) {
            return data; // API returns devices directly as an array
        }
        if (data && Array.isArray(data.data)) {
            return data.data; // API returns devices under a "data" property
        }
        throw new Error('Invalid response format'); // Handle unexpected responses
    },

    getDeviceById: async (id) => {
        const response = await fetch(`${API_URL}/devices/${id}`);
        if (!response.ok) throw new Error('Failed to fetch device');
        return await response.json();
    },
    createDevice: async (device) => {
        const response = await fetch(`${API_URL}/devices`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(device),
        });
        if (!response.ok) throw new Error('Failed to create device');
        return await response.json();
    },
    updateDevice: async (id, updatedDevice) => {
        const response = await fetch(`${API_URL}/devices/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedDevice),
        });
        if (!response.ok) throw new Error('Failed to update device');
        return await response.json();
    },
    deleteDevice: async (id) => {
        const response = await fetch(`${API_URL}/devices/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete device');
    },
};

export default api;