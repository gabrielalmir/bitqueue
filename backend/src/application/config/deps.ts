import { QueueController } from "../../infrastructure/controllers/queue.controller";
import { CuidAdapter } from "../../infrastructure/frameworks/cuid.adapter";
import { InMemoryQueueRepository } from "../../infrastructure/repositories/in-memory-queue.repository";
import { createQueueSchema } from "../../infrastructure/validation/create-queue.validation";
import { dequeueMessageSchema } from "../../infrastructure/validation/dequeue-message.validation";
import { enqueueMessageSchema } from "../../infrastructure/validation/enqueue-message.validation";
import { MessageModelFactory } from "../models/message.model";
import { QueueModelFactory } from "../models/queue.model";
import { UserModelFactory } from "../models/user.model";
import { QueueService } from "../services/queue.service";

// Ports: Generators
const idGenerator = new CuidAdapter();

// Queue
export const queueRepository = new InMemoryQueueRepository();
export const queueService = new QueueService(queueRepository);
export const queueController = new QueueController(queueService, createQueueSchema, enqueueMessageSchema, dequeueMessageSchema);
export const queueModelFactory = new QueueModelFactory(idGenerator)

// Message
export const messageModelFactory = new MessageModelFactory(idGenerator);

// User
export const userModelFactory = new UserModelFactory(idGenerator);
