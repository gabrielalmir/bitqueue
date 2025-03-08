import { MessageStatus, type Message } from "../../domain/entities/message";
import type { Queue } from "../../domain/entities/queue";
import type { QueueRepository } from "../../domain/repositories/queue.repository";
import type { QueueUsecase } from "../../domain/usecases/queue.usecase";
import { messageModelFactory, queueModelFactory } from "../config/deps";

export class QueueService implements QueueUsecase {
    constructor(
        private readonly queueRepository: QueueRepository,
    ) { }

    async createQueue(userId: string, name: string): Promise<Queue> {
        const newQueue = queueModelFactory.create({ userId, name });
        return await this.queueRepository.createQueue(newQueue);
    }

    async getQueues(userId: string): Promise<Queue[]> {
        return await this.queueRepository.getQueues(userId);
    }

    async enqueueMessage(queueId: string, content: string): Promise<Message> {
        return await this.queueRepository.enqueueMessage(messageModelFactory.create({ queueId, content, status: MessageStatus.PENDING }))
    }

    async dequeueMessage(queueId: string): Promise<Message | null> {
        return await this.queueRepository.dequeueMessage(queueId);
    }
}
