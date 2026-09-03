import {z} from "zod/v4";

export const createJobSchema = z.object({
  type: z.string().min(1),
  payload: z.unknown(),
})