require('dotenv').config();
const axios = require('axios');
const { getRandomDevice, getRandomSensorUpdate, getRandomItem } = require('./utils');

const API_URL = process.env.API_URL || 'http://localhost:4000/api/devices';
const UPDATE_INTERVAL = process.env.UPDATE_INTERVAL || 10000; // 10 seconds
const CREATE_INTERVAL = process.env.CREATE_INTERVAL || 30000; // 30 seconds
const DELETE_INTERVAL = process.env.DELETE_INTERVAL || 60000; // 60 seconds

// Store created devices to simulate update and delete
let deviceCache = [];

//Function to create a new device
async function createDevice() {
  const newDevice = getRandomDevice();
  try {
    const response = await axios.post(API_URL, newDevice);
    const { name, _id } = response.data.data; // ✅ Corrected to access the nested data
    
    // Check if response data contains name and id
    if (!name || !_id) {
      console.warn('❌ Invalid response from API (name or ID is missing)');
      return;
    }

    deviceCache.push(response.data.data); // ✅ Update to push the correct data
    console.log(`✅ Created Device: ${name} (ID: ${_id})`);
  } catch (error) {
    console.error('❌ Error creating device:', error.response?.data || error.message);
  }
}

//Function to update a random device's sensor
async function updateDevice() {
  if (deviceCache.length === 0) return; // Skip if no devices to update

  const device = getRandomItem(deviceCache); // Randomly select a device
  if (!device) {
      console.warn('⚠️ No device found to update.');
      return;
  }

  const updatedSensorData = getRandomSensorUpdate(device.sensors);
  if (!updatedSensorData.length) {
      console.warn('⚠️ No sensors available to update.');
      return;
  }

  try {
      const response = await axios.put(`${API_URL}/${device._id}`, { 
          type: device.type, // Ensure the type remains valid
          name: device.name,
          sensors: updatedSensorData 
      });
      console.log(`🔄 Updated Device: ${device.name} with new sensor data`);
  } catch (error) {
      console.error('❌ Error updating device:', error.response?.data || error.message);
  }
}

// 3️⃣ Function to delete a random device
async function deleteDevice() {
  if (deviceCache.length === 0) return;

  const deviceIndex = Math.floor(Math.random() * deviceCache.length);
  const device = deviceCache[deviceIndex];

  if (!device || !device._id) {
    console.warn('⚠️ No valid device to delete.');
    return;
  }

  try {
    await axios.delete(`${API_URL}/${device._id}`);
    deviceCache.splice(deviceIndex, 1);
    console.log(`🗑️ Deleted Device: ${device.name} (ID: ${device._id})`);
  } catch (error) {
    console.error('❌ Error deleting device:', error.response?.data || error.message);
  }
}

// **Start the simulation**
function startSimulation() {
  console.log('🚀 Starting device simulator...');
  setInterval(createDevice, CREATE_INTERVAL); // Create a new device every 30 seconds
  setInterval(updateDevice, UPDATE_INTERVAL); // Update a device every 10 seconds
  setInterval(deleteDevice, DELETE_INTERVAL); // Delete a device every 60 seconds
}

startSimulation();