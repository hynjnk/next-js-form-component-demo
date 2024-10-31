"use server";

import { parseWithZod } from "@conform-to/zod";
import { rockPaperScissorsSchema } from "../_schema/rockPaperScissorsSchema";

export async function rockPaperScissorsAction(
  prevState: unknown,
  formData: FormData
) {
  const submission = parseWithZod(formData, {
    schema: rockPaperScissorsSchema,
  });

  if (submission.status !== "success") {
    return {
      message: null,
      ...submission.reply(),
    };
  }

  const { player } = submission.value;

  // sleep for 2000ms
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const choices = ["rock", "paper", "scissors"];
  const opponentChoice = choices[Math.floor(Math.random() * choices.length)];

  let result;
  if (player === opponentChoice) {
    result = "It's a tie!";
  } else if (
    (player === "rock" && opponentChoice === "scissors") ||
    (player === "paper" && opponentChoice === "rock") ||
    (player === "scissors" && opponentChoice === "paper")
  ) {
    result = "You win!";
  } else {
    result = "You lose!";
  }

  return {
    message: `You chose ${player}, opponent chose ${opponentChoice}. ${result}`,
    ...submission.reply(),
  };
}
