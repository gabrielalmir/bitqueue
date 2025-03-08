import { MessageStatus, type Message } from "../core/entities/message";
import type { Queue } from "../core/entities/queue";
import type { QueueRepository } from "../core/repositories/queue.repository";
import type { QueueUsecase } from "../core/usecases/queue.usecase";
import { MessageModel } from "../models/message.model";
import { QueueModel } from "../models/queue.model";

export class QueueService implements QueueUsecase {
    constructor(
        private readonly queueRepository: QueueRepository,
    ) { }

    async createQueue(userId: string, name: string): Promise<Queue> {
        return await this.queueRepository.createQueue(QueueModel.create({ userId, name }));
    }

    async getQueues(userId: string): Promise<Queue[]> {
        return await this.queueRepository.getQueues(userId);
    }

    async enqueueMessage(queueId: string, content: string): Promise<Message> {
        return await this.queueRepository.enqueueMessage(MessageModel.create({ queueId, content, status: MessageStatus.PENDING }))
    }

    async dequeueMessage(queueId: string): Promise<Message | null> {
        return await this.queueRepository.dequeueMessage(queueId);
    }
}
