# Get the last nodejs LTS version
FROM node:12.16.1-slim

# Create an app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Expose app port
EXPOSE 8080

# Start app
CMD [ "npm", "start" ]