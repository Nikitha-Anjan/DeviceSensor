import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav style={styles.navbar}>
            <h1 style={styles.title}>ACME Device Sensor Dashboard</h1>
            <ul style={styles.navLinks}>
                <li style={styles.navItem}>
                    <Link to="/" style={styles.link}>Dashboard-Real Time Data</Link>
                </li>
                <li style={styles.navItem}>
                    <Link to="/add-device" style={styles.link}>Add Device</Link>
                </li>
                <li style={styles.navItem}>
                    <Link to="/devices" style={styles.link}>Update/Delete Devices</Link>
                </li>
                <li style={styles.navItem}>
                    <Link to="/about" style={styles.link}>About</Link>
                </li>
            </ul>
        </nav>
    );
}

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#333',
        padding: '10px 20px',
        color: 'white',
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
    },
    navLinks: {
        display: 'flex',
        listStyle: 'none',
        margin: 0,
        padding: 0,
    },
    navItem: {
        marginLeft: '30px',
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '20px',
        fontWeight: 'bold',
    },
};

export default Navbar;