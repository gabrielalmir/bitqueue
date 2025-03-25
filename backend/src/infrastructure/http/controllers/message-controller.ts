import type { FastifyInstance } from 'fastify';
import { z } from 'zod';
import type { MessageService } from '../../../domain/services/message-service';
import type { QueueService } from '../../../domain/services/queue-service';
import { verifyToken } from '../../jwt';

const enqueueMessageSchema = z.object({
    content: z.string().min(1),
});

const dequeueMessageSchema = z.object({
    visibilityTimeout: z.number().min(1).optional(),
});

export class MessageController {
    constructor(
        private readonly messageService: MessageService,
        private readonly queueService: QueueService
    ) { }

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

        server.post('/queues/:queueId/messages', async (request, reply) => {
            const { queueId } = request.params as { queueId: string };
            const queue = await this.queueService.getQueue(queueId);

            if (queue.userId !== request.userId) {
                return reply.status(403).send({ error: 'Forbidden' });
            }

            const input = enqueueMessageSchema.parse(request.body);
            const result = await this.messageService.enqueueMessage(queueId, input);
            return reply.status(201).send(result);
        });

        server.post('/queues/:queueId/messages/dequeue', async (request, reply) => {
            const { queueId } = request.params as { queueId: string };
            const queue = await this.queueService.getQueue(queueId);

            if (queue.userId !== request.userId) {
                return reply.status(403).send({ error: 'Forbidden' });
            }

            const input = dequeueMessageSchema.parse(request.body);
            const result = await this.messageService.dequeueMessage(queueId, input);

            if (!result) {
                return reply.status(204).send();
            }

            return reply.send(result);
        });

        server.post('/messages/:messageId/complete', async (request, reply) => {
            const { messageId } = request.params as { messageId: string };
            const message = await this.messageService.completeMessage(messageId);
            const queue = await this.queueService.getQueue(message.queueId);

            if (queue.userId !== request.userId) {
                return reply.status(403).send({ error: 'Forbidden' });
            }

            return reply.send(message);
        });

        server.post('/messages/:messageId/fail', async (request, reply) => {
            const { messageId } = request.params as { messageId: string };
            const message = await this.messageService.failMessage(messageId);
            const queue = await this.queueService.getQueue(message.queueId);

            if (queue.userId !== request.userId) {
                return reply.status(403).send({ error: 'Forbidden' });
            }

            return reply.send(message);
        });

        server.get('/queues/:queueId/messages', async (request, reply) => {
            const { queueId } = request.params as { queueId: string };
            const queue = await this.queueService.getQueue(queueId);

            if (queue.userId !== request.userId) {
                return reply.status(403).send({ error: 'Forbidden' });
            }

            const messages = await this.messageService.listMessages(queueId);
            return reply.send(messages);
        });
    }
}
