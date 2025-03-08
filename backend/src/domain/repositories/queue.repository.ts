import type { Message } from "../entities/message";
import type { Queue } from "../entities/queue";

export interface QueueRepository {
  createQueue(queue: Queue): Promise<Queue>;
  getQueues(userId: string): Promise<Queue[]>;

  enqueueMessage(message: Message): Promise<Message>;
  dequeueMessage(queueId: string): Promise<Message | null>;
}
