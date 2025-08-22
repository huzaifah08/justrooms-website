// backend/server.ts
import Fastify from "fastify";
import cors from "@fastify/cors";
import * as dotenv from "dotenv";

dotenv.config();

const fastify = Fastify({ logger: true });

const RATEHAWK_BASE = "https://api.worldota.net/api/b2b/v3";
const KEY_ID = process.env.KEY_ID!;
const API_KEY = process.env.API_KEY!;

const authHeader = Buffer.from(`${KEY_ID}:${API_KEY}`).toString("base64");

fastify.get("/", async () => ({ status: "Fastify backend running ✅" }));

fastify.get("/api/search-hotels", async (request, reply) => {
  try {
    const { destination, checkIn, checkOut, guests } = request.query as any;
    fastify.log.info(`Search request: dest=${destination}, checkIn=${checkIn}, checkOut=${checkOut}, guests=${guests}`);

    const body = {
      language: "en",
      guests: [{ adults: Number(guests) || 2 }],
      checkin: checkIn,
      checkout: checkOut,
      location: { query: destination },
    };

    fastify.log.debug("Payload for RateHawk:", body);

    const res = await fetch(`${RATEHAWK_BASE}/search/serp/hotels/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${authHeader}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errText = await res.text();
      fastify.log.error("RateHawk error:", errText);
      throw new Error(`RateHawk API error: ${errText}`);
    }

    const data = await res.json();
    fastify.log.info(`Received ${data.hotels?.length || 0} hotels`);
    return data;
  } catch (err: any) {
    fastify.log.error(err.message);
    reply.status(500).send({ error: err.message });
  }
});

const start = async () => {
  try {
    await fastify.register(cors, { origin: true });
    await fastify.listen({ host: "0.0.0.0", port: 8080 });
    fastify.log.info("Server running at http://localhost:8080");
    fastify.log.info(`Auth header using KEY_ID: ${KEY_ID ? "yes" : "no"}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
