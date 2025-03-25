import type { MessageRepository } from '../repositories/message-repository';
import type { QueueRepository } from '../repositories/queue-repository';
import type { DequeueMessageInput, EnqueueMessageInput, Message } from '../types';

export class MessageService {
    constructor(
        private readonly messageRepository: MessageRepository,
        private readonly queueRepository: QueueRepository
    ) { }

    async enqueueMessage(queueId: string, input: EnqueueMessageInput): Promise<Message> {
        const queue = await this.queueRepository.findById(queueId);
        if (!queue) {
            throw new Error('Queue not found');
        }

        return this.messageRepository.enqueue(queueId, input);
    }

    async dequeueMessage(queueId: string, input?: DequeueMessageInput): Promise<Message | null> {
        const queue = await this.queueRepository.findById(queueId);
        if (!queue) {
            throw new Error('Queue not found');
        }

        const message = await this.messageRepository.dequeue(queueId, input?.visibilityTimeout);
        if (!message) {
            return null;
        }

        await this.messageRepository.updateStatus(message.id, 'processing');
        return message;
    }

    async completeMessage(messageId: string): Promise<Message> {
        const message = await this.messageRepository.findById(messageId);
        if (!message) {
            throw new Error('Message not found');
        }

        return this.messageRepository.updateStatus(messageId, 'completed');
    }

    async failMessage(messageId: string): Promise<Message> {
        const message = await this.messageRepository.findById(messageId);
        if (!message) {
            throw new Error('Message not found');
        }

        return this.messageRepository.updateStatus(messageId, 'failed');
    }

    async listMessages(queueId: string): Promise<Message[]> {
        const queue = await this.queueRepository.findById(queueId);
        if (!queue) {
            throw new Error('Queue not found');
        }

        return this.messageRepository.findByQueueId(queueId);
    }
}
