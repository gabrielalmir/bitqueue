export interface Message {
  id: string;
  queueId: string;
  content: string;
  status: 'pending' | 'processed' | 'failed';
  enqueuedAt: string;
  visibilityTimeoutAt?: string;
}
