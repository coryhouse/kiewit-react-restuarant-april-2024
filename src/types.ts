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

export const tagSchema = z.enum([
  "Alcoholic",
  "Appetizer",
  "Breakfast",
  "Dinner",
  "Dessert",
  "Drink",
  "Lunch",
  "Spicy",
  "Vegetarian",
]);

export type Tag = z.infer<typeof tagSchema>;
