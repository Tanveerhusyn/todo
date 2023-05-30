# Use an official Node.js runtime as the base image
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app's source code to the container
COPY . .

# Set the environment variable for the Express.js app
ENV NODE_ENV=production

# Expose the port on which the Express.js app will run
EXPOSE 5000

# Start the Express.js app
CMD ["npm", "start"]
