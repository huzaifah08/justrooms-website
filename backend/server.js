// Import Fastify 
const fastify = require('fastify')({ logger: true });

// Enable CORS if needed
const cors = require('@fastify/cors');

fastify.register(cors, {
  // Options for CORS can be specified here, for example:
  origin: true // Reflects the request origin, or customize as needed
});


// Set up the database connection (using pg for Neon)
const { Client } = require('pg');
require('dotenv').config();  // To load environment variables from .env file

// Create a PostgreSQL client
const client = new Client({
  connectionString: process.env.DATABASE_URL,  // Your Neon DB connection string
});

client.connect()
  .then(() => console.log('Connected to Neon DB'))
  .catch(err => console.error('Connection error', err.stack));

// Define a simple route to test Fastify
fastify.get('/', async (request, reply) => {
  return { message: 'Hello from Fastify!' };
});

// API route to fetch hotels (you can extend this to query Neon DB)
fastify.get('/api/hotels', async (request, reply) => {
  const res = await client.query('SELECT * FROM hotels');
  return res.rows;
});

// Start the server using an options object for the listen method
fastify.listen({ port: 8080, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Fastify server is running at ${address}`);
});
