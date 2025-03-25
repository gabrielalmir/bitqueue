import { PrismaClient } from '@prisma/client';
import type { QueueRepository } from '../../domain/repositories/queue-repository';
import type { CreateQueueInput, Queue } from '../../domain/types';

export class PrismaQueueRepository implements QueueRepository {
    constructor(private readonly prisma: PrismaClient) { }

    async create(userId: string, input: CreateQueueInput): Promise<Queue> {
        return this.prisma.queue.create({
            data: {
                ...input,
                userId,
            },
        });
    }

    async findById(id: string): Promise<Queue | null> {
        return this.prisma.queue.findUnique({
            where: { id },
            include: { messages: true },
        });
    }

    async findByUserIdAndName(userId: string, name: string): Promise<Queue | null> {
        return this.prisma.queue.findUnique({
            where: {
                userId_name: {
                    userId,
                    name,
                },
            },
        });
    }

    async findAllByUserId(userId: string): Promise<Queue[]> {
        return this.prisma.queue.findMany({
            where: { userId },
            include: { messages: true },
        });
    }

    async delete(id: string): Promise<void> {
        await this.prisma.queue.delete({
            where: { id },
        });
    }
}
