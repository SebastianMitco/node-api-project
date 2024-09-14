# Use the official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Copy the config file
COPY config/config.env ./config/config.env

# Expose the port your app runs on
EXPOSE 5000

# Start the application in development mode
CMD ["npm", "run", "dev"]
