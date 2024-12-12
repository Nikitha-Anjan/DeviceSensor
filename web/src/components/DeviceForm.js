import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addDevice } from '../redux/actions/deviceActions';

function DeviceForm() {
    const [form, setForm] = useState({
        name: '',
        type: 'car',
        sensors: [{ name: '', value: '' }],
    });
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!form.name || form.name.trim() === '') {
            setError('Device name is required.');
            return;
        }

        if (!form.type) {
            setError('Device type is required.');
            return;
        }

        if (!form.sensors || form.sensors.length === 0) {
            setError('At least one sensor is required.');
            return;
        }

        for (let i = 0; i < form.sensors.length; i++) {
            const sensor = form.sensors[i];
            if (!sensor.name || !sensor.value) {
                setError('All sensors must have a name and a value.');
                return;
            }
        }

        dispatch(addDevice(form));

        // Reset form after submission
        setForm({ name: '', type: 'car', sensors: [{ name: '', value: '' }] });
        setError(null);
    };

    const handleSensorChange = (index, field, value) => {
        const updatedSensors = [...form.sensors];
        updatedSensors[index][field] = value;
        setForm({ ...form, sensors: updatedSensors });
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
                    placeholder="Device Name"
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
                            onChange={(e) => handleSensorChange(index, 'name', e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Sensor Value"
                            value={sensor.value}
                            onChange={(e) => handleSensorChange(index, 'value', e.target.value)}
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
                <button type="submit">Add Device</button>
            </div>
        </form>
    );
}

export default DeviceForm;