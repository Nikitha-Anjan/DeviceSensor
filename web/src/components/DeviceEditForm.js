import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateDevice,fetchDevices } from '../redux/actions/deviceActions';

function DeviceEditForm({ device, onClose }) {
    const [form, setForm] = useState(device);
    const [error, setError] = useState(null); // Track validation errors
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedDevice = { ...form }; // Create a new object

        // Basic validation
        if (!updatedDevice.name || updatedDevice.name.trim() === '') {
            setError('Device name is required.');
            return;
        }

        if (!updatedDevice.type) {
            setError('Device type is required.');
            return;
        }

        if (!updatedDevice.sensors || updatedDevice.sensors.length === 0) {
            setError('At least one sensor is required.');
            return;
        }

        // Dispatch the updated object and fetch updated devices
        dispatch(updateDevice(device._id, updatedDevice)).then(() => {
            dispatch(fetchDevices()); // Fetch the latest data
        });
        // Clear error (if any), close the form
        setError(null);
        onClose();
    };

    const handleSensorChange = (index, field, value) => {
        setForm((prevForm) => {
            const updatedSensors = prevForm.sensors.map((sensor, idx) =>
                idx === index ? { ...sensor, [field]: value } : sensor
            );
            return { ...prevForm, sensors: updatedSensors };
        });
    };

    const addSensor = () => {
        setForm({
            ...form,
            sensors: [...form.sensors, { name: '', value: '' }],
        });
    };

    const removeSensor = (index) => {
        const updatedSensors = form.sensors.filter((_, i) => i !== index);
        setForm({ ...form, sensors: updatedSensors });
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

            <div>
                <label htmlFor="name">Device Name:</label>
                <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
            </div>

            <div>
                <label htmlFor="type">Device Type:</label>
                <select
                    id="type"
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                >
                    <option value="">Select Type</option>
                    <option value="car">Car</option>
                    <option value="fridge">Fridge</option>
                    <option value="thermostat">Thermostat</option>
                    <option value="industrial machine">Industrial Machine</option>
                </select>
            </div>

            <div>
                <h4>Sensors</h4>
                {form.sensors.map((sensor, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                        <input
                            type="text"
                            placeholder="Sensor Name"
                            value={sensor.name}
                            onChange={(e) =>
                                handleSensorChange(index, 'name', e.target.value)
                            }
                        />
                        <input
                            type="text"
                            placeholder="Sensor Value"
                            value={sensor.value}
                            onChange={(e) =>
                                handleSensorChange(index, 'value', e.target.value)
                            }
                        />
                        <button
                            type="button"
                            onClick={() => removeSensor(index)}
                            style={{ marginLeft: '10px' }}
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button type="button" onClick={addSensor}>
                    Add Sensor
                </button>
            </div>

            <div>
                <button type="submit">Save Changes</button>
                <button type="button" onClick={onClose} style={{ marginLeft: '10px' }}>
                    Cancel
                </button>
            </div>
        </form>
    );
}

export default DeviceEditForm;