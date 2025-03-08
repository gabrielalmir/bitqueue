import { z } from "zod";
import type { EnqueueMessageInput } from "../../application/dtos/enqueue-message.dto";
import { ZodValidationAdapter } from "./zod.validation";

export const enqueueMessageSchema = new ZodValidationAdapter<EnqueueMessageInput>(
  z.object({
    params: z.object({
      queueId: z.string().min(1, 'Queue ID is required'),
    }),
    body: z.object({
      content: z.string().min(1, 'Content is required'),
    }),
  })
);
