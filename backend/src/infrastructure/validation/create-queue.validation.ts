import { z } from "zod";
import type { CreateQueueInput } from "../../application/dtos/create-queue.dto";
import { ZodValidationAdapter } from "./zod.validation";

export const createQueueSchema = new ZodValidationAdapter<CreateQueueInput>(
  z.object({
    body: z.object({
      userId: z.string(),
      name: z.string().regex(/^[a-z0-9-]+$/, 'Queue name must be lowercase, numbers, and hyphens only'),
    }),
  })
);
