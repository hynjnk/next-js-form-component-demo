import { VanillaForm } from "./_components/VanillaForm";
import { NextJsForm } from "./_components/NextJsForm";

export default function WeatherLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <aside className="w-72 p-4 bg-gray-100 flex flex-col gap-4">
        <h2 className="text-gray-700 text-lg font-semibold">
          app/weather/layout.tsx
        </h2>
        <VanillaForm />
        <NextJsForm />
      </aside>
      {children}
    </div>
  );
}
