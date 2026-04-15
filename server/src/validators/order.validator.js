/* This code snippet is written in JavaScript and it is using the Zod library for data validation.
Here's a breakdown of what the code is doing: */
import { z } from "zod";

export const createOrderSchema = z.object({
  customerName: z.string().min(2),
  phone: z.string().min(10),
  garments: z.array(
    z.object({
      type: z.string(),
      quantity: z.number().min(1),
      price: z.number().min(1)
    })
  ).min(1)
});