import type { MessageRepository } from '../repositories/message-repository';
import type { QueueRepository } from '../repositories/queue-repository';
import type { CreateQueueInput, Queue } from '../types';

export class QueueService {
    constructor(
        private readonly queueRepository: QueueRepository,
        private readonly messageRepository: MessageRepository
    ) { }

    async createQueue(userId: string, input: CreateQueueInput): Promise<Queue> {
        const existingQueue = await this.queueRepository.findByUserIdAndName(userId, input.name);
        if (existingQueue) {
            throw new Error('Queue already exists');
        }

        return this.queueRepository.create(userId, input);
    }

    async getQueue(id: string): Promise<Queue> {
        const queue = await this.queueRepository.findById(id);
        if (!queue) {
            throw new Error('Queue not found');
        }
        return queue;
    }

    async listQueues(userId: string): Promise<Queue[]> {
        return this.queueRepository.findAllByUserId(userId);
    }

    async deleteQueue(id: string): Promise<void> {
        const queue = await this.queueRepository.findById(id);
        if (!queue) {
            throw new Error('Queue not found');
        }

        await this.messageRepository.deleteByQueueId(id);
        await this.queueRepository.delete(id);
    }
}
