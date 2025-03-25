import type { EnqueueMessageInput, Message, MessageStatus } from '../types';

export interface MessageRepository {
    enqueue(queueId: string, input: EnqueueMessageInput): Promise<Message>;
    dequeue(queueId: string, visibilityTimeout?: number): Promise<Message | null>;
    updateStatus(id: string, status: MessageStatus): Promise<Message>;
    findById(id: string): Promise<Message | null>;
    findByQueueId(queueId: string): Promise<Message[]>;
    deleteByQueueId(queueId: string): Promise<void>;
}
