import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDevices, deleteDevice } from '../redux/actions/deviceActions';
import DeviceEditForm from './DeviceEditForm';

function DeviceList() {
    // Use the dispatch and selector hooks to interact with Redux
    const dispatch = useDispatch();
    const { devices, loading, error } = useSelector((state) => state.devices);
    const [editingDeviceId, setEditingDeviceId] = useState(null); // Track which device is being edited

    /**
     * Fetch all devices on component mount
     */
    useEffect(() => {
        dispatch(fetchDevices());
    }, [dispatch]);

    /**
     * Handle device delete
     * @param {string} id - ID of the device to be deleted
     */
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this device?')) {
            dispatch(deleteDevice(id));
        }
    };

    /**
     * Handle edit click
     * @param {string} id - ID of the device to be edited
     */
    const handleEditClick = (id) => {
        setEditingDeviceId(id); // Set the device ID for editing
    };

    /**
     * Handle edit form closure
     */
    const handleEditClose = () => {
        setEditingDeviceId(null); // Close the edit form
    };

    // Conditional rendering for loading, error, and empty state
    if (loading) return <div>Loading...</div>;
    if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;
    if (!Array.isArray(devices) || devices.length === 0) return <div>No devices available. Please add a device.</div>;

    return (
        <div>
            <h2>Devices</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {devices.map((device) => (
                    <li 
                        key={device._id} 
                        style={{ border: '1px solid #ccc', marginBottom: '15px', padding: '15px', borderRadius: '8px', backgroundColor: '#f9f9f9' }}
                    >
                        {editingDeviceId === device._id ? (
                            // Show the edit form if this device is being edited
                            <DeviceEditForm device={device} onClose={handleEditClose} />
                        ) : (
                            <div>
                                <h4 style={{ marginBottom: '10px' }}>
                                    {device.name} ({device.type})
                                </h4>

                                <ul style={{ paddingLeft: '15px' }}>
                                    {device.sensors && device.sensors.length > 0 ? (
                                        device.sensors.map((sensor, index) => (
                                            <li key={index} style={{ marginBottom: '5px' }}>
                                                <strong>Sensor:</strong> {sensor.name} — <strong>Value:</strong> {sensor.value}
                                            </li>
                                        ))
                                    ) : (
                                        <li>No sensors available for this device.</li>
                                    )}
                                </ul>

                                <button 
                                    onClick={() => handleEditClick(device._id)} 
                                    style={{ 
                                        backgroundColor: '#4caf50', 
                                        color: 'white', 
                                        padding: '10px 15px', 
                                        borderRadius: '5px', 
                                        border: 'none', 
                                        cursor: 'pointer', 
                                        marginRight: '10px' 
                                    }}
                                >
                                    Edit
                                </button>

                                <button 
                                    onClick={() => handleDelete(device._id)} 
                                    style={{ 
                                        backgroundColor: '#f44336', 
                                        color: 'white', 
                                        padding: '10px 15px', 
                                        borderRadius: '5px', 
                                        border: 'none', 
                                        cursor: 'pointer' 
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DeviceList;