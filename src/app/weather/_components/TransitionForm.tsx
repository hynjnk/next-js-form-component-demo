"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEventHandler, useTransition } from "react";

export function TransitionForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const city = searchParams.get("city") || "";

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const params = new URLSearchParams(formData as unknown as Record<string, string>);
    
    startTransition(() => {
      router.replace(`/weather?${params.toString()}`);
    });
  };

  return (
    <div className="p-6 bg-purple-50 rounded-lg border border-purple-200">
      <h3 className="text-lg font-semibold text-purple-700">Transition Form</h3>
      <form action="/weather" onSubmit={handleSubmit} className="relative mt-4">
        <Search className="w-5 h-5 text-purple-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          name="city"
          placeholder="City name..."
          defaultValue={city}
          className="w-full px-4 py-2 pl-10 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
        {isPending && <PendingSpinner />}
      </form>
    </div>
  );
}

const PendingSpinner = () => {
  return (
    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
      <div className="w-5 h-5 border-4 border-purple-400 border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
  );
};
