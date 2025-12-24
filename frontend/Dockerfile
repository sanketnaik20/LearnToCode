# Step 1: Build the React application
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install

# Copy all files
COPY . .

# Build-time argument for API URL
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Build for production
RUN npm run build

# Step 2: Serve the application using Nginx
FROM nginx:alpine

# Copy custom nginx config if we had one, but default is fine for now
# Copy built files from previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
