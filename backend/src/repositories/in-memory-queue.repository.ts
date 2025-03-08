import type { Message } from "../core/entities/message";
import type { Queue } from "../core/entities/queue";
import type { QueueRepository } from "../core/repositories/queue.repository";

export class InMemoryQueueRepository implements QueueRepository {
    static readonly queues = new Array<Queue>();
    static readonly messages = new Array<Message>();

    async createQueue(queue: Queue): Promise<Queue> {
        const queueCreated: Queue = await new Promise(() => {
            InMemoryQueueRepository.queues.push(queue);
            return queue;
        });

        return queueCreated;
    }

    async getQueues(userId: string): Promise<Queue[]> {
        return InMemoryQueueRepository.queues.filter(queue => queue.userId === userId);
    }

    async enqueueMessage(message: Message): Promise<Message> {
        const queueExists = InMemoryQueueRepository.queues.some(queue => queue.id === message.queueId);

        if (!queueExists) {
            throw new Error("Queue doesn't exists");
        }


        const messageCreated: Message = await new Promise(() => {
            InMemoryQueueRepository.messages.push(message);
            return message;
        });

        return messageCreated;
    }

    async dequeueMessage(queueId: string): Promise<Message | null> {
        const messages = InMemoryQueueRepository.messages.filter(message => message.queueId === queueId);
        return messages.shift() ?? null;
    }
}
