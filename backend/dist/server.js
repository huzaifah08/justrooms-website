"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import Fastify
const fastify_1 = __importDefault(require("fastify"));
const cors_1 = __importDefault(require("@fastify/cors"));
const pg_1 = require("pg");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
// Initialize Fastify
const fastify = (0, fastify_1.default)({ logger: true });
// Enable CORS
fastify.register(cors_1.default, {
    origin: true, // Allow all origins (you can restrict later)
});
// Create a PostgreSQL client
const client = new pg_1.Client({
    connectionString: process.env.DATABASE_URL, // Your Neon DB connection string
});
// Connect to DB
client.connect()
    .then(() => console.log('✅ Connected to Neon DB'))
    .catch(err => console.error('❌ Connection error', err.stack));
// Test route
fastify.get('/', async () => {
    return { message: 'Hello from Fastify + TypeScript!' };
});
// Hotels API route
fastify.get('/api/hotels', async () => {
    const res = await client.query('SELECT * FROM hotels');
    return res.rows;
});
// Start the server
fastify.listen({ port: 8080, host: '0.0.0.0' })
    .then((address) => console.log(`🚀 Fastify server running at ${address}`))
    .catch((err) => {
    fastify.log.error(err);
    process.exit(1);
});
