import type { CreateQueueInput, Queue } from '../types';

export interface QueueRepository {
    create(userId: string, input: CreateQueueInput): Promise<Queue>;
    findById(id: string): Promise<Queue | null>;
    findByUserIdAndName(userId: string, name: string): Promise<Queue | null>;
    findAllByUserId(userId: string): Promise<Queue[]>;
    delete(id: string): Promise<void>;
}
