export interface User {
    id: string;
    email: string;
    password: string;
    createdAt: Date;
}

export interface Queue {
    id: string;
    userId: string;
    name: string;
    createdAt: Date;
    messages?: Message[];
}

export interface Message {
    id: string;
    queueId: string;
    content: string;
    status: MessageStatus;
    enqueuedAt: Date;
    visibilityTimeoutAt?: string;
}

export type MessageStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface CreateUserInput {
    email: string;
    password: string;
}

export interface CreateQueueInput {
    name: string;
}

export interface EnqueueMessageInput {
    content: string;
}

export interface DequeueMessageInput {
    visibilityTimeout?: number; // in seconds
}

export interface AuthenticatedUser {
    id: string;
    email: string;
    token: string;
}
