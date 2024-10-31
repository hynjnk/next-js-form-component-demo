import { z } from "@/app/_schema/ja-zod";

export const rockPaperScissorsSchema = z.object({
  player: z.enum(["rock", "paper", "scissors"]),
});
