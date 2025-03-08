export interface EnqueueMessageInput {
    params: {
        queueId: string;
    },
    body: {
        content: string;
    }
}
