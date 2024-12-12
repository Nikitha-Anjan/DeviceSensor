FROM node:16

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm config set registry https://registry.npmjs.org/
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Expose the port the React app runs on
EXPOSE 3000

# Start the React application
CMD ["npm", "start"]