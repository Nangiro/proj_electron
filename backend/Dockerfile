# Use an official Node.js runtime as a parent image
FROM node:20.12.2

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 3000 to the outside world
EXPOSE 3001

# Command to run the application
CMD ["npm", "run", "dev"]
