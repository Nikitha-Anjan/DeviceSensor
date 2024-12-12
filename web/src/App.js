import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import DeviceList from './components/DeviceList';
import DeviceForm from './components/DeviceForm';
import Dashboard from './components/Dashboard';
import About from './components/About';

function App() {
    return (
        <Router>
            <Navbar />
            <main style={styles.main}>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/add-device" element={<DeviceForm />} />
                    <Route path="/devices" element={<DeviceList />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </main>
        </Router>
    );
}

const styles = {
    main: {
        padding: '20px',
    },
};

export default App;