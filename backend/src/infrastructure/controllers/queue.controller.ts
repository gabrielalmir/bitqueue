import type { CreateQueueInput } from "../../application/dtos/create-queue.dto";
import type { DenqueueMessageInput } from "../../application/dtos/dequeue-message.dto";
import type { EnqueueMessageInput } from "../../application/dtos/enqueue-message.dto";
import type { QueueService } from "../../application/services/queue.service";
import type { HttpContext } from "../../domain/contexts/http.context";
import type { Validation } from "../../domain/validation/validation";

export class QueueController {
    constructor(
        private service: QueueService,
        private createQueueValidator: Validation<CreateQueueInput>,
        private enqueueMessageValidator: Validation<EnqueueMessageInput>,
        private dequeueMessageValidator: Validation<DenqueueMessageInput>
    ) { }

    async createQueue(ctx: HttpContext): Promise<any> {
        const body = await ctx.getBody();
        const { body: { name, userId } } = await this.createQueueValidator.validate({ body });
        return await this.service.createQueue(userId, name);
    }

    async getQueues(ctx: HttpContext): Promise<any> {
        const { queueId } = ctx.getParams();
        return await this.service.getQueues(queueId);
    }

    async enqueueMessage(ctx: HttpContext): Promise<any> {
        const params = ctx.getParams();
        const body = await ctx.getBody();
        const { params: { queueId }, body: { content } } = await this.enqueueMessageValidator.validate({ params, body });
        return await this.service.enqueueMessage(queueId, content);
    }

    async dequeueMessage(ctx: HttpContext): Promise<any> {
        const params = ctx.getParams();
        const { params: { queueId } } = await this.dequeueMessageValidator.validate({ params });
        return await this.service.dequeueMessage(queueId);
    }
}
