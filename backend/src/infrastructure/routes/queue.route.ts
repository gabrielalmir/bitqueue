import type { FastifyInstance } from "fastify";
import { queueService } from "../../application/config/deps";
import type { QueueController } from "../controllers/queue.controller";
import { FastifyAdapter } from "../frameworks/fastify.adapter";

export function setupQueueRoutes(app: FastifyInstance, controller: QueueController) {
    app.post('/queue', async (request, reply) => {
        const adapter = new FastifyAdapter(request, reply);
        try {
            const result = await controller.createQueue(adapter);
            adapter.setStatus(201);
            return adapter.json(result);
        } catch (error) {
            adapter.setStatus(400);
            return adapter.json({ error: error instanceof Error ? error.message : 'Invalid request' });
        }
    });

    app.get('/queue/:userId', async (request, reply) => {
        const adapter = new FastifyAdapter(request, reply);
        try {
            const result = controller.getQueues(adapter);
            adapter.setStatus(200);
            return adapter.json(result);
        } catch (error) {
            adapter.setStatus(400);
            return adapter.json({ error: error instanceof Error ? error.message : 'Invalid request' });
        }
    });

    app.post('/queue/:queueId/message', async (request, reply) => {
        const adapter = new FastifyAdapter(request, reply);
        try {
            const result = await controller.enqueueMessage(adapter);
            adapter.setStatus(200);
            return adapter.json(result);
        } catch (error) {
            adapter.setStatus(400);
            return adapter.json({ error: error instanceof Error ? error.message : 'Invalid request' });
        }
    });

    app.get('/queue/:queueId/message', async (req) => {
        const { queueId } = req.params as any;
        const message = await queueService.dequeueMessage(queueId);
        return { message };
    });
}
