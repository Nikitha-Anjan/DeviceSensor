# ACME Device Sensor Dashboard

ACME Device Sensor Dashboard demonstrates an IoT platform with REST API functionality, a web dashboard for monitoring devices, a web application to add, update and delete devices or sensors and a simulator for generating IoT device data. 

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Future Improvements](#future-improvements)

---

## Features
- Add new devices with their type and associated sensors.
- Edit device details and sensor values.
- Delete devices.
- Search for devices by their ID.
- Real-time monitoring of device sensor data using WebSockets.
- Dashboard for visualizing devices categorized by type.
- Error handling for invalid inputs and server issues.

---

## Technologies Used
### Frontend
- React.js
- Redux Toolkit
- HTML5, CSS3, JavaScript

### Backend
- Node.js
- Express.js
- Mongoose (MongoDB)

### Additional Tools
- WebSockets for real-time updates
- Postman for API testing

---

## Installation

### Prerequisites
Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [npm](https://www.npmjs.com/)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/DeviceSensor.git

   cd DeviceSensor
   npm install

##Set up of environment files for server, web, and the simulator
.env for server
# MongoDB Connection URL for the Backend
MONGO_URI=mongodb://mongo:27017/iot-platform

# Server Port
PORT=4000

# Node Environment (development or production)
NODE_ENV=development


.env for web
# Backend API URL for the Web Application
REACT_APP_API_URL=http://localhost:4000/api

.env for device-simulator
API_URL=http://localhost:4000/api/devices
UPDATE_INTERVAL=10000 # Update every 10 seconds
CREATE_INTERVAL=30000  # Create new device every 30 seconds
DELETE_INTERVAL=60000  # Delete a device every 60 seconds

##Use Docker Compose to build and start all containers:
Docker.compose.yml is in the root folder which should be built.
In bash
         cd DeviceSensor-main(root folder)
docker compose up --build
       
##Access the Applications:
       - Web Application: http://localhost:3000
       - API Server: http://localhost:4000/api/devices

##Run the Simulator:
       Navigate to the simulator directory and run the script:
In bash
       cd device-simulator
       node simulator.js








