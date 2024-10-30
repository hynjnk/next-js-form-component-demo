import React from "react";
import Form from "next/form";

import { Search } from "lucide-react";

export default async function Home() {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="p-6 bg-orange-50 rounded-lg border border-orange-200">
        <h2 className="text-lg font-semibold text-orange-700 mb-4">Vanilla HTML Form</h2>
        <form action="weather" className="relative">
          <Search className="w-5 h-5 text-orange-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            name="city"
            placeholder="Search city..."
            className="w-full px-4 py-2 pl-10 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </form>
      </div>

      <div className="p-6 bg-blue-50 rounded-lg border border-blue-200 my-4">
        <h2 className="text-lg font-semibold text-blue-700 mb-4">Next.js Form Component</h2>
        <Form action="weather" className="relative">
          <Search className="w-5 h-5 text-blue-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            name="city"
            placeholder="Search city..."
            className="w-full px-4 py-2 pl-10 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </Form>
      </div>
    </div>
  );
}
