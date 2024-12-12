import React from 'react';

function About() {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>About ACME Device Sensor Dashboard</h1>
            <p style={styles.text}>
                Welcome to the ACME Device Sensor Dashboard, your one-stop platform for monitoring and managing various devices in real-time. This application provides insights into different devices, their sensors, and their current statuses to help ensure optimal performance and detect issues early.
            </p>

            <h2 style={styles.subTitle}>Supported Devices</h2>
            <ul style={styles.list}>
                <li>
                    <strong>Car:</strong> Monitors battery levels, fluid levels, engine temperature, and tire pressure.
                </li>
                <li>
                    <strong>Fridge:</strong> Tracks temperature, defrost alarm, ice levels, and water leakage.
                </li>
                <li>
                    <strong>Thermostat:</strong> Measures resistance, voltage, and temperature to ensure consistent home climate control.
                </li>
                <li>
                    <strong>Industrial Machine:</strong> Monitors operational sensors like pressure, temperature, and performance metrics.
                </li>
            </ul>

            <h2 style={styles.subTitle}>Sensors Used</h2>
            <p style={styles.text}>
                Each device has a variety of sensors to measure specific attributes:
            </p>
            <ul style={styles.list}>
                <li>
                    <strong>Battery Level:</strong> Indicates the battery level of devices.
                </li>
                <li>
                    <strong>Temperature:</strong> Tracks the temperature of fridges, thermostats, and engines.
                </li>
                <li>
                    <strong>Pressure:</strong> Measures tire pressure in cars and operational pressure in industrial machines.
                </li>
                <li>
                    <strong>Humidity:</strong> Records humidity levels in environments like industrial setups.
                </li>
                <li>
                    <strong>Voltage and Resistance:</strong> Vital for thermostats and electrical devices to ensure safe operation.
                </li>
            </ul>

            <h2 style={styles.subTitle}>Features</h2>
            <ul style={styles.list}>
                <li>Real-time updates of device sensor values using WebSocket connections.</li>
                <li>Visualization of sensor data with color coding for critical, warning, and optimal statuses.</li>
                <li>Ability to edit device and sensor details for accurate data management.</li>
                <li>Support for adding and removing devices and sensors dynamically.</li>
            </ul>

            <h2 style={styles.subTitle}>How It Works</h2>
            <p style={styles.text}>
                The application fetches device and sensor data from a backend API and updates the dashboard in real-time using WebSocket connections. Users can interact with the application to:
            </p>
            <ul style={styles.list}>
                <li>Monitor real time status of devices using the Dashboard.</li>
                <li>Analyze performance and health of devices in various categories.</li>
                <li>Add new devices by specifying the device name, type, and associated sensors with their respective values.</li>
                <li>Update existing devices by modifying their name, type, or associated sensors and their values.</li>  
                <li>Delete devices from the system, including all associated sensor data.</li>  
            </ul>

            <p style={styles.text}>
                This dashboard empowers users to maintain and manage devices effectively, reducing downtime and ensuring safety and efficiency.
            </p>
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f9f9f9',
        color: '#333',
    },
    title: {
        fontSize: '2rem',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '20px',
        color: '#222',
    },
    subTitle: {
        fontSize: '1.5rem',
        fontWeight: '600',
        marginTop: '20px',
        marginBottom: '10px',
        color: '#444',
    },
    text: {
        fontSize: '1rem',
        lineHeight: '1.6',
        marginBottom: '15px',
    },
    list: {
        listStyleType: 'disc',
        paddingLeft: '20px',
        lineHeight: '1.6',
    },
};

export default About;