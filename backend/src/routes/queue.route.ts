import type { FastifyInstance } from "fastify";
import { queueService } from "../config/deps";

export default (app: FastifyInstance) => {
    app.post('/queue', async (req) => {
        const { userId, name } = req.body as any;
        const queue = await queueService.createQueue(userId, name);
        return { queueId: queue.id, createdAt: queue.createdAt };
    });

    app.get('/queue/:user_id', async (req) => {
        const { userId } = req.params as any;
        const queues = await queueService.getQueues(userId);
        return { queues };
    });

    app.post('/queue/:queue_id/message', async (req) => {
        const { queueId } = req.params as any;
        const { content } = req.body as any;
        const message = await queueService.enqueueMessage(queueId, content);
        return { message };
    });

    app.get('/queue/:queue_id/message', async (req) => {
        const { queueId } = req.params as any;
        const message = await queueService.dequeueMessage(queueId);
        return { message };
    });
}
