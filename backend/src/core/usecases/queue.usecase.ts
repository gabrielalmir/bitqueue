import type { Message } from "../entities/message";
import type { Queue } from "../entities/queue";

export interface QueueUsecase {
  createQueue(userId: string, name: string): Promise<Queue>;
  getQueues(userId: string): Promise<Queue[]>;
  enqueueMessage(queueId: string, content: string): Promise<Message>;
  dequeueMessage(queueId: string): Promise<Message | null>;
}
