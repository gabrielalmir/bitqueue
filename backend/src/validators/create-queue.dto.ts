import { z } from "zod";

export const createQueueSchema = z.object({
  name: z.string().regex(/^[a-z0-9-]+$/, 'Queue name must be lowercase, numbers, and hyphens only'),
});
