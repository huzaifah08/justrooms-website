# Use an official Node.js runtime based on Alpine for a small image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files first (this improves caching if dependencies haven’t changed)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the Next.js app for production
RUN npm run build

# Expose the port the app runs on (adjust if your Next.js app uses a different port)
EXPOSE 3000

# Override any default ENTRYPOINT from the base image
ENTRYPOINT []

# Use the production start command
CMD ["npm", "start"]
