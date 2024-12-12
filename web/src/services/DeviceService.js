const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

const DeviceService = {
    getDevices: async () => {
        const response = await fetch(`${API_URL}/devices`);
        if (!response.ok) {
            throw new Error('Failed to fetch devices');
        }
        return await response.json();
    },
};

export default DeviceService;