import React, { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Form from "next/form";

import { z } from "zod";
import { Search } from "lucide-react";

import {
  CITY_NOT_FOUND_ERROR,
  DailyForecast,
  weatherForecastService,
} from "./_services/weatherForecastService";
import {
  DailyForecastCard,
  DailyForecastCardSkeleton,
} from "./_components/DailyForecastCard";

const searchParamsSchema = z.object({
  city: z.string().optional(),
});

export const generateMetadata = async ({
  searchParams,
}: {
  // https://nextjs.org/docs/app/api-reference/file-conventions/page#searchparams-optional
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}): Promise<Metadata> => {
  const { city } = await searchParamsSchema
    .parseAsync(await searchParams)
    .catch(notFound);

  // Sleep for 1000ms
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    title: city ? `Weather forecast for ${city}` : "Weather forecast",
  };
};

export default async function Weather({
  searchParams,
}: {
  // https://nextjs.org/docs/app/api-reference/file-conventions/page#searchparams-optional
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { city } = await searchParamsSchema
    .parseAsync(await searchParams)
    .catch(notFound);

  const weatherForecasts = city
    ? weatherForecastService
        .searchCity(city)
        .then(weatherForecastService.getForecasts)
        .catch((error) => {
          if (CITY_NOT_FOUND_ERROR === error.message) {
            return [];
          }
          throw error;
        })
    : Promise.resolve([]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="p-6 bg-orange-50 rounded-lg border border-orange-200">
        <h2 className="text-lg font-semibold text-orange-700 mb-4">
          Vanilla HTML Form
        </h2>
        <form action="" className="relative">
          <Search className="w-5 h-5 text-orange-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            name="city"
            defaultValue={city}
            placeholder="Search city..."
            className="w-full px-4 py-2 pl-10 rounded-lg border border-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
        </form>
      </div>

      <div className="p-6 bg-blue-50 rounded-lg border border-blue-200 my-4">
        <h2 className="text-lg font-semibold text-blue-700 mb-4">
          Next.js Form Component
        </h2>
        <Form action="" className="relative">
          <Search className="w-5 h-5 text-blue-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            name="city"
            defaultValue={city}
            placeholder="Search city..."
            className="w-full px-4 py-2 pl-10 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </Form>
      </div>

      <Suspense key={city} fallback={<WeatherForcastFallback />}>
        <WeatherForcastResult
          weatherForecasts={weatherForecasts}
          searchedCity={city}
        />
      </Suspense>
    </div>
  );
}

const WeatherForcastResult = async ({
  weatherForecasts,
  searchedCity,
}: {
  weatherForecasts: Promise<DailyForecast[]>;
  searchedCity?: string;
}) => {
  if (!searchedCity) {
    return (
      <div className="text-center text-gray-500">
        Search for a city to see weather forecast
      </div>
    );
  }

  const result = await weatherForecasts;
  if (result.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No weather data found for &quot;{searchedCity}&quot;
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {result.map((forecast) => (
        <DailyForecastCard key={forecast.date} forecast={forecast} />
      ))}
    </div>
  );
};

const WeatherForcastFallback = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {[...Array(6)].map((_, index) => (
      <DailyForecastCardSkeleton key={index} />
    ))}
  </div>
);
