import fastify from "fastify";
import queueRoute from "./routes/queue.route";

const app = fastify({ logger: true });

app.register(queueRoute);

export { app };
