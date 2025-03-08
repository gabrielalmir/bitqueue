export interface Message {
  id: string;
  queueId: string;
  content: string;
  status: MessageStatus;
  enqueuedAt: Date;
  visibilityTimeoutAt: string | null;
}

export enum MessageStatus {
  PENDING = 'pending',
  PROCESSED = 'processed',
  FAILED = 'failed',
}
