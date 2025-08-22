# Use a lightweight Node image
FROM node:20-alpine

WORKDIR /app

# Copy package files first
COPY package*.json tsconfig.json ./

# Install dependencies
RUN npm install

# Copy the rest of your backend code
COPY . .

# Compile TypeScript to JavaScript (dist/)
RUN npx tsc

# Expose port 8080 (assuming Fastify listens on 8080)
EXPOSE 8080

# Run the compiled JS
CMD ["node", "dist/server.js"]
