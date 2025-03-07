import { z } from "zod";

export const enqueueMessageSchema = z.object({
  content: z.string().min(1, 'Content is required'),
});
