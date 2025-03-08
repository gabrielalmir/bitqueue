import { InMemoryQueueRepository } from "../repositories/in-memory-queue.repository";
import { QueueService } from "../services/queue.service";

// Queue
export const queueRepository = new InMemoryQueueRepository();
export const queueService = new QueueService(queueRepository);
