import React from 'react';

function DeviceDetails({ device }) {
    return (
        <div>
            <h3>{device.name} ({device.type})</h3>
            <ul>
                {device.sensors.map((sensor, index) => (
                    <li key={index}>
                        {sensor.name}: {sensor.value}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DeviceDetails;