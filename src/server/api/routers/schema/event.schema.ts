import z from "zod";

export const createEventSchema = z.object({
  name: z.string(),
  date: z.date(),
  location: z.string(),
  description: z.string(),
  startTime: z.string(),
});

export type createEventInput = z.TypeOf<typeof createEventSchema>;
