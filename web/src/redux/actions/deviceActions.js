import api from '../../services/apiService';

// Fetch all devices
export const fetchDevices = () => async (dispatch) => {
    dispatch({ type: 'FETCH_DEVICES_REQUEST' });
    try {
        const devices = await api.getDevices();
        dispatch({ type: 'FETCH_DEVICES_SUCCESS', payload: devices });
    } catch (error) {
        dispatch({ type: 'FETCH_DEVICES_FAILURE', payload: error.message });
    }
};

// Fetch a single device by ID
export const fetchDeviceById = (id) => async (dispatch) => {
    dispatch({ type: 'FETCH_DEVICE_REQUEST' });
    try {
        const device = await api.getDeviceById(id);
        dispatch({ type: 'FETCH_DEVICE_SUCCESS', payload: device });
    } catch (error) {
        dispatch({ type: 'FETCH_DEVICE_FAILURE', payload: error.message });
    }
};

// Add a new device with sensors
export const addDevice = (device) => async (dispatch) => {
    dispatch({ type: 'ADD_DEVICE_REQUEST' });
    try {
        const newDevice = await api.createDevice(device);
        dispatch({ type: 'ADD_DEVICE_SUCCESS', payload: newDevice });
        dispatch(fetchDevices()); // Optional: Fetch latest data
    } catch (error) {
        dispatch({ type: 'ADD_DEVICE_FAILURE', payload: error.message });
        console.error('Error adding device:', error.message);
    }
};

// Update an existing device, including sensors
export const updateDevice = (id, updatedDevice) => async (dispatch) => {
    dispatch({ type: 'UPDATE_DEVICE_REQUEST' });
    try {
        const device = await api.updateDevice(id, updatedDevice);
        dispatch({ type: 'UPDATE_DEVICE_SUCCESS', payload: device });
    } catch (error) {
        dispatch({ type: 'UPDATE_DEVICE_FAILURE', payload: error.message });
        console.error('Error updating device:', error.message);
    }
};

// Delete a device
export const deleteDevice = (id) => async (dispatch) => {
    dispatch({ type: 'DELETE_DEVICE_REQUEST' });
    try {
        await api.deleteDevice(id);
        dispatch({ type: 'DELETE_DEVICE_SUCCESS', payload: id });
        dispatch(fetchDevices()); // Optional: Fetch latest data
    } catch (error) {
        dispatch({ type: 'DELETE_DEVICE_FAILURE', payload: error.message });
        console.error('Error deleting device:', error.message);
    }
};

// Handle WebSocket real-time updates
export const updateRealTimeDevice = (updatedDevice) => (dispatch, getState) => {
    const { devices } = getState().devices;
    const existingDeviceIndex = devices.findIndex(
        (device) => device._id === updatedDevice._id
    );

    const updatedDevices =
        existingDeviceIndex >= 0
            ? devices.map((device, index) =>
                  index === existingDeviceIndex ? updatedDevice : device
              )
            : [...devices, updatedDevice];

    dispatch({ type: 'UPDATE_REAL_TIME_DEVICE', payload: updatedDevices });
};