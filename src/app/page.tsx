import React from "react";
import { Search } from "lucide-react";
import { DailyForcastCard } from "./_components/DailyForcastCard";

export default async function Home({
  searchParams
}:{
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const city = (await searchParams).city;

  // dummy weather forcast data
  const weatherData = [
    {
      date: "2024-10-28",
      maxTemp: 24,
      minTemp: 16,
      rainProbability: 10,
      weather: "sunny",
    },
    {
      date: "2024-10-29",
      maxTemp: 22,
      minTemp: 15,
      rainProbability: 60,
      weather: "rainy",
    },
    {
      date: "2024-10-30",
      maxTemp: 20,
      minTemp: 14,
      rainProbability: 30,
      weather: "cloudy",
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <form action="" className="relative mb-8">
        <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          name="city"
          defaultValue={city as string}
          placeholder="Search city..."
          className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {weatherData.map((forcast) => (
          <DailyForcastCard key={forcast.date} forcast={forcast} />
        ))}
      </div>
    </div>
  );
}