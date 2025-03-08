import type { Message } from "../../domain/entities/message";
import type { Queue } from "../../domain/entities/queue";
import type { QueueRepository } from "../../domain/repositories/queue.repository";

export class InMemoryQueueRepository implements QueueRepository {
    static readonly queues = new Array<Queue>();
    static readonly messages = new Array<Message>();

    async createQueue(queue: Queue): Promise<Queue> {
        InMemoryQueueRepository.queues.push(queue);
        return queue;
    }

    async getQueues(userId: string): Promise<Queue[]> {
        return InMemoryQueueRepository.queues.filter(queue => queue.userId === userId);
    }

    async enqueueMessage(message: Message): Promise<Message> {
        const queueExists = InMemoryQueueRepository.queues.some(queue => queue.id === message.queueId);

        if (!queueExists) {
            throw new Error("Queue doesn't exists");
        }

        InMemoryQueueRepository.messages.push(message);
        return message;
    }

    async dequeueMessage(queueId: string): Promise<Message | null> {
        const messages = InMemoryQueueRepository.messages.filter(message => message.queueId === queueId);
        return messages.shift() ?? null;
    }
}
