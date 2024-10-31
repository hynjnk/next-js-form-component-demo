"use client";

import { useForm } from "@conform-to/react";
import { useActionState } from "react";
import { rockPaperScissorsAction } from "../_actions/rockPaperScissorsAction";
import { useFormStatus } from "react-dom";
import { AlertCircle, Loader2 } from "lucide-react";
import { parseWithZod } from "@conform-to/zod";
import { rockPaperScissorsSchema } from "../_schema/rockPaperScissorsSchema";

export function RockPaperScissorsForm() {
  const [lastResult, action, pending] = useActionState(
    rockPaperScissorsAction,
    undefined
  );

  const [form, fields] = useForm({
    // Sync the result of last submission
    lastResult,

    // Reuse the validation logic on the client
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: rockPaperScissorsSchema });
    },

    // Validate the form on blur event triggered
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  return (
    <div className="p-6 bg-green-50 rounded-lg border border-green-200">
      <h3 className="text-lg font-semibold text-green-700">
        Rock Paper Scissors
      </h3>
      <form
        id={form.id}
        onSubmit={form.onSubmit}
        action={action}
        className="relative mt-4 flex flex-col gap-4"
        noValidate
      >
        <input
          type="text"
          key={fields.player.key}
          name={fields.player.name}
          defaultValue={fields.player.initialValue}
          placeholder="Player choice..."
          list="choices"
          className="w-full px-4 py-2 rounded-lg border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        <datalist id="choices">
          <option value="rock" />
          <option value="paper" />
          <option value="scissors" />
        </datalist>
        {fields.player.errors && (
          <ul
            role="alert"
            className="mt-2 text-sm text-red-500 space-y-1 list-none"
          >
            {fields.player.errors.map((error, index) => (
              <li key={index} className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </li>
            ))}
          </ul>
        )}
        <SubmitButton />
        <p>react useActionState pending: {`${pending}`}</p>
        <p>{lastResult?.message}</p>
      </form>
    </div>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <>
      <button
        type="submit"
        className={`w-full bg-green-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-green-600 transition-colors relative ${
          pending ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={pending}
      >
        {pending ? <Loader2 className="h-6 w-6 animate-spin" /> : "Submit"}
      </button>
      <p>react-dom useFormStatus pending: {`${pending}`}</p>
    </>
  );
};
