# Use Node 18 Alpine for a small, secure image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy dependency files first for better caching
COPY package*.json ./

# Install production dependencies only
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Expose the backend port
EXPOSE 5001

# Command to run the application
CMD ["node", "index.js"]
