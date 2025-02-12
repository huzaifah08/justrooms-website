# Use a lightweight Node image
FROM node:20-alpine

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your backend code
COPY . .

# Expose port 8080 (assuming your Fastify app listens on port 8080)
EXPOSE 8080

# Start the Fastify app (ensure your package.json "start" script does this)
CMD ["npm", "start"]

