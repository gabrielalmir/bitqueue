import type { Queue } from "@prisma/client";

export interface QueueRepository {
  createQueue(queue: Queue): Promise<void>;
  getQueues(userId: string): Promise<Queue[]>;
}
