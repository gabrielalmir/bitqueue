import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import type { QueueService } from '../../../domain/services/queue-service';
import { verifyToken } from '../../jwt';

const createQueueSchema = z.object({
    name: z.string().min(1),
});

export class QueueController {
    constructor(private readonly queueService: QueueService) { }

    async register(server: FastifyInstance) {
        server.addHook('preHandler', async (request, reply) => {
            try {
                const authHeader = request.headers.authorization;
                if (!authHeader?.startsWith('Bearer ')) {
                    throw new Error('Missing or invalid token');
                }

                const token = authHeader.split(' ')[1];
                const { userId } = verifyToken(token);
                request.userId = userId;
            } catch (error) {
                reply.status(401).send({ error: 'Unauthorized' });
            }
        });

        server.post('/queues', async (request, reply) => {
            const input = createQueueSchema.parse(request.body);
            const result = await this.queueService.createQueue(request.userId, input);
            return reply.status(201).send(result);
        });

        server.get('/queues', async (request, reply) => {
            const result = await this.queueService.listQueues(request.userId);
            return reply.send(result);
        });

        server.get('/queues/:id', async (request, reply) => {
            const { id } = request.params as { id: string };
            const result = await this.queueService.getQueue(id);

            if (result.userId !== request.userId) {
                return reply.status(403).send({ error: 'Forbidden' });
            }

            return reply.send(result);
        });

        server.delete('/queues/:id', async (request, reply) => {
            const { id } = request.params as { id: string };
            const queue = await this.queueService.getQueue(id);

            if (queue.userId !== request.userId) {
                return reply.status(403).send({ error: 'Forbidden' });
            }

            await this.queueService.deleteQueue(id);
            return reply.status(204).send();
        });
    }
}
