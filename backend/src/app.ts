import fastify from "fastify";
import { queueController } from "./application/config/deps";
import { setupQueueRoutes } from "./infrastructure/routes/queue.route";

const app = fastify({ logger: true });

setupQueueRoutes(app, queueController);

export { app };
