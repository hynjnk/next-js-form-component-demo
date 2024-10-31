import React from "react";

import { VanillaForm } from "./_components/VanillaWeatherForm";
import { NextJsForm } from "./_components/NextJsWeatherForm";

export default async function Home() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h2 className="text-lg font-semibold mb-4">app/page.tsx</h2>
      <div className="bg-white p-6 rounded-lg border border-gray-200 flex flex-col gap-4">
        <h2 className="text-lg font-semibold">action=&quot;/weather&quot;</h2>
        <VanillaForm />
        <NextJsForm />
      </div>
    </div>
  );
}
