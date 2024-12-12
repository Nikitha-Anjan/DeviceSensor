const { faker } = require('@faker-js/faker');

// Helper function to get a random item from an array
const getRandomItem = (array) => {
    if (!Array.isArray(array) || array.length === 0) {
        console.warn('⚠️ No valid items found in the array.');
        return null;
    }
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
};

// Generate a new random device
const getRandomDevice = () => {
  const deviceTypes = ['car', 'fridge', 'thermostat', 'industrial machine']; // Allowed types
  const sensorsByDeviceType = {
      car: ['Battery Level', 'Fluid Levels', 'Engine Temperature', 'Tire Pressure'],
      fridge: ['Defrost Alarm', 'Ice Level', 'Water Leak', 'Current Temperature'],
      thermostat: ['Temperature', 'Resistance', 'Voltage'],
      'industrial machine': ['Humidity Level', 'Pressure Level', 'Temperature']
  };

  const type = getRandomItem(deviceTypes); // Randomly select a valid device type
  const sensorNames = sensorsByDeviceType[type] || []; // Get sensors for the selected type
  const sensors = sensorNames.map((sensorName) => ({
      name: sensorName,
      value: `${faker.number.int({ min: 0, max: 100 })}`, // Random sensor value
  }));

  const name = `Device-${faker.string.alphanumeric
      ? faker.string.alphanumeric(6)
      : faker.random.alphaNumeric(6)}`; // Generate device name based on faker version

  return {
      type,
      name,
      sensors,
  };
};

// Update sensor values for a device
const getRandomSensorUpdate = (sensors) => {
    if (!Array.isArray(sensors) || sensors.length === 0) {
        console.warn('⚠️ No sensors found for update. Returning empty array.');
        return [];
    }

    return sensors.map((sensor) => ({
        ...sensor,
        value: `${faker.number.int({ min: 0, max: 100 })}` // Randomly update the sensor value
    }));
};

module.exports = { getRandomDevice, getRandomSensorUpdate, getRandomItem };