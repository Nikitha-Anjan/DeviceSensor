import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDevices, updateRealTimeDevice } from '../redux/actions/deviceActions';
import api from '../services/apiSocketService.js';

const Dashboard = () => {
    const dispatch = useDispatch();
    const devices = useSelector((state) => state.devices.devices);

    useEffect(() => {
        // Fetch devices on mount
        dispatch(fetchDevices());
        
        // Setup WebSocket connection
        api.connectSocket();
        api.onSensorUpdate((updatedDevice) => {
            dispatch(updateRealTimeDevice(updatedDevice)); // Dispatch real-time updates
        });
        
        // Listen for device add/delete WebSocket events
        api.onDeviceAdd((newDevice) => {
            dispatch(fetchDevices()); // Fetch updated devices
        });

        api.onDeviceDelete((deletedDeviceId) => {
            dispatch(fetchDevices()); // Fetch updated devices
        });
        // Cleanup on component unmount
        return () => {
            console.log('Disconnecting WebSocket...');
            api.disconnectSocket();
        };
    }, [dispatch]);

    // Group devices by type
    const groupDevicesByType = () => {
        const types = ['car', 'fridge', 'thermostat', 'industrial machine'];
        const groupedDevices = {};
        types.forEach((type) => {
            groupedDevices[type] = Array.isArray(devices)
                ? devices.filter((device) => device.type === type)
                : [];
        });
        return groupedDevices;
    };

    const sensorColorRules = {
        'battery level': value => (value < 20 ? 'red' : value >= 20 && value <= 59 ? 'yellow' : 'green'),
        'fluid levels': value => (value < 25 ? 'red' : value >= 25 && value <= 49 ? 'yellow' : 'green'),
        'engine temperature': value => (value >= 95 ? 'red' : value >= 70 && value <= 94 ? 'yellow' : 'green'),
        'tire pressure': value => (value < 25 || value > 45 ? 'red' : value >= 25 && value <= 31 ? 'yellow' : 'green'),
        'temperature': value => (value >= 10 ? 'red' : value >= 3 && value < 10 ? 'yellow' : 'green'),
        'humidity level': value => (value >= 70 ? 'red' : value >= 50 && value < 70 ? 'yellow' : 'green'),
        'pressure level': value => (value >= 120 ? 'red' : value >= 80 && value < 120 ? 'yellow' : 'green'),
        'defrost alarm': value => (value < 20 ? 'green' : value >= 20 && value <= 59 ? 'yellow' : 'red'),
        'water leak': value => (value < 20 ? 'green' : value >= 20 && value <= 59 ? 'yellow' : 'red'),
        'ice level': value => (value < 30 ? 'red' : value >= 30 && value <= 59 ? 'yellow' : 'green'),
        'current temperature': value => (value >= 10 ? 'red' : value >= 3 && value < 10 ? 'yellow' : 'green'),
        'resistance': value => (value >= 50 ? 'red' : value >= 10 && value < 30 ? 'yellow' : 'green'),
        'voltage': value => (value >= 70 ? 'red' : value >= 20 && value < 50 ? 'yellow' : 'green')
    };

    const sensorUnits = {
        'battery level': '%',
        'fluid levels': '%',
        'engine temperature': '°C',
        'tire pressure': ' PSI',
        'temperature': '°C',
        'humidity level': '%',
        'pressure level': ' PSI',
        'defrost alarm': '%',
        'water leak': '%',
        'ice level': '%',
        'current temperature': '°C',
        'resistance': 'Ω',
        'voltage': 'V'
    };

    const getSensorColor = (sensorName, value) => {
        if (!sensorName) return 'gray';
        const normalizedSensorName = sensorName.trim().toLowerCase();
        const colorFunction = sensorColorRules[normalizedSensorName];
        return colorFunction ? colorFunction(parseFloat(value)) : 'gray';
    };

    const getSensorUnit = (sensorName) => {
        if (!sensorName) return '';
        const normalizedSensorName = sensorName.trim().toLowerCase();
        const unit = sensorUnits[normalizedSensorName];
        return unit || '';
    };

    const groupedDevices = groupDevicesByType();

    return (
        <div style={styles.dashboard}>
            <h1 style={styles.title}>
                Device sensor values: 
                <span style={{ color: 'black', backgroundColor: 'red', padding: '2px 3px', borderRadius: '4px' }}> RED </span> 
                indicates critical, 
                <span style={{ color: 'black', backgroundColor: 'yellow', padding: '2px 3px', borderRadius: '4px' }}> YELLOW </span> 
                indicates warning, and 
                <span style={{ color: 'black', backgroundColor: 'green', padding: '2px 3px', borderRadius: '4px' }}> GREEN </span> 
                indicates optimal.
            </h1>
            <div style={styles.columnsContainer}>
                {Object.keys(groupedDevices).map((type) => (
                    <div key={type} style={styles.column}>
                        <h2 style={styles.columnHeader}>{type.charAt(0).toUpperCase() + type.slice(1)}</h2>
                        {groupedDevices[type].length > 0 ? (
                            <ul style={styles.deviceList}>
                                {groupedDevices[type].map((device) => (
                                    <li key={device._id} style={styles.deviceCard}>
                                        <h4>{device.name}</h4>
                                        <ul>
                                            {device.sensors.map((sensor, index) => (
                                                <li key={index} style={styles.sensorItem}>
                                                    <strong>{sensor.name}</strong>: 
                                                    <span style={{ 
                                                        marginLeft: '10px', 
                                                        display: 'inline-block', 
                                                        padding: '5px 10px', 
                                                        borderRadius: '5px', 
                                                        backgroundColor: getSensorColor(sensor.name,sensor.value), 
                                                        color: 'black' 
                                                    }}>
                                                        {sensor.value}{getSensorUnit(sensor.name)}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No devices available</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    dashboard: {
        padding: '20px',
    },
    title: {
        textAlign: 'center',
        fontSize: '1rem',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: '#343a40',
    },
    columnsContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        gap: '10px',
        flexWrap: 'wrap',
    },
    column: {
        width: '23%',
        backgroundColor: '#f4f4f9',
        borderRadius: '8px',
        padding: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    columnHeader: {
        textAlign: 'center',
        marginBottom: '10px',
    },
    deviceList: {
        listStyleType: 'none',
        padding: 0,
    },
    deviceCard: {
        backgroundColor: '#ffffff',
        borderRadius: '6px',
        padding: '10px',
        marginBottom: '10px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
    },
    sensorItem: {
        marginBottom: '5px',
    }
};

export default Dashboard;