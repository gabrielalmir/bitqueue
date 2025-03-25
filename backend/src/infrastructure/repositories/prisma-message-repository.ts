import { PrismaClient } from '@prisma/client';
import type { MessageRepository } from '../../domain/repositories/message-repository';
import type { EnqueueMessageInput, Message, MessageStatus } from '../../domain/types';

export class PrismaMessageRepository implements MessageRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async enqueue(queueId: string, input: EnqueueMessageInput): Promise<Message> {
        return this.prisma.message.create({
            data: {
                ...input,
                queueId,
                status: 'pending',
            },
        });
    }

    async dequeue(queueId: string, visibilityTimeout?: number): Promise<Message | null> {
        const message = await this.prisma.message.findFirst({
            where: {
                queueId,
                status: 'pending',
                OR: [
                    { visibilityTimeoutAt: null },
                    { visibilityTimeoutAt: { lt: new Date().toISOString() } },
                ],
            },
            orderBy: { enqueuedAt: 'asc' },
        });

        if (!message) {
            return null;
        }

        const timeout = visibilityTimeout ?? 30; // Default 30 seconds
        const visibilityTimeoutAt = new Date(Date.now() + timeout * 1000).toISOString();

        return this.prisma.message.update({
            where: { id: message.id },
            data: { visibilityTimeoutAt },
        });
    }

    async updateStatus(id: string, status: MessageStatus): Promise<Message> {
        return this.prisma.message.update({
            where: { id },
            data: {
                status,
                visibilityTimeoutAt: null,
            },
        });
    }

    async findById(id: string): Promise<Message | null> {
        return this.prisma.message.findUnique({
            where: { id },
        });
    }

    async findByQueueId(queueId: string): Promise<Message[]> {
        return this.prisma.message.findMany({
            where: { queueId },
            orderBy: { enqueuedAt: 'desc' },
        });
    }

    async deleteByQueueId(queueId: string): Promise<void> {
        await this.prisma.message.deleteMany({
            where: { queueId },
        });
    }
}
