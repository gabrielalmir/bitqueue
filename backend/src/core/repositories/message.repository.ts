import type { Message } from "@prisma/client";

export interface MessageRepository {
  enqueueMessage(message: Message): Promise<void>;
  dequeueMessage(queueId: number): Promise<Message | null>;
}
