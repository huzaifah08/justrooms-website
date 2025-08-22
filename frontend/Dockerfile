# Use a lightweight Node.js image
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy package files first (better caching for Docker layers)
COPY package*.json tsconfig.json ./

# Install dependencies (no dev deps in production image)
RUN npm install --only=production

# Copy source code
COPY . .

# Build TypeScript into dist/
RUN npx tsc

# Expose Fastify port
EXPOSE 8080

# Run the compiled server
CMD ["node", "dist/backend/server.js"]
