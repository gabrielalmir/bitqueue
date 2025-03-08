export interface HealthRepository {
  getMetrics(userId: string): Promise<{ totalQueues: number; messagesProcessed: number }>;
}
