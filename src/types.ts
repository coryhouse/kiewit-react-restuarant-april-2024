import { z } from "zod";

export const foodSchema = z
  .object({
    id: z.number(),
    name: z.string(),
    image: z.string(),
    price: z.number(),
    description: z.string(),
    tags: z.array(z.string()),
  })
  .strict();

export type Food = z.infer<typeof foodSchema>;
