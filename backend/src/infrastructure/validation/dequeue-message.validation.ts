import { z } from "zod";
import type { DenqueueMessageInput } from "../../application/dtos/dequeue-message.dto";
import { ZodValidationAdapter } from "./zod.validation";

export const dequeueMessageSchema = new ZodValidationAdapter<DenqueueMessageInput>(
    z.object({
        params: z.object({
            queueId: z.string().min(1, 'Queue ID is required'),
        }),
    })
);
