export interface HealthUsecase {
    getMetrics(userId: string): Promise<{ totalQueues: number; messagesProcessed: number }>;
}
