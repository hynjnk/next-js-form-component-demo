import React, { Suspense } from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { z } from "zod";

import {
  CITY_NOT_FOUND_ERROR,
  DailyForecast,
  weatherForecastService,
} from "./_services/weatherForecastService";
import {
  DailyForecastCard,
  DailyForecastCardSkeleton,
} from "./_components/DailyForecastCard";
import { VanillaForm } from "../_components/VanillaWeatherForm";
import { NextJsForm } from "../_components/NextJsWeatherForm";

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

  // Sleep for 2000ms
  await new Promise((resolve) => setTimeout(resolve, 2000));

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
  // Sleep for 4000ms
  await new Promise((resolve) => setTimeout(resolve, 4000));
  const { city } = await searchParamsSchema
    .parseAsync(await searchParams)
    .catch(notFound);

  const weatherForecasts = city
    ? weatherForecastService
        .searchCity(city)
        .then(async (city) => {
          // Sleep for 2000ms
          await new Promise((resolve) => setTimeout(resolve, 2000));
          return city;
        })
        .then(weatherForecastService.getForecasts)
        .catch((error) => {
          if (CITY_NOT_FOUND_ERROR === error.message) {
            return [];
          }
          throw error;
        })
    : Promise.resolve([]);

  return (
    <main className="bg-white rounded-lg grow p-6 m-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-lg font-semibold mb-4">app/weather/page.tsx</h2>
        <div className="grid grid-cols-2 gap-4">
          <VanillaForm />
          <NextJsForm />
        </div>
        <Suspense key={city} fallback={<WeatherForcastFallback />}>
          <WeatherForcastResult
            weatherForecasts={weatherForecasts}
            searchedCity={city}
          />
        </Suspense>
      </div>
    </main>
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
      <div className="text-center text-gray-500 mt-4">
        Search for a city to see weather forecast
      </div>
    );
  }

  const result = await weatherForecasts;
  if (result.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-4">
        No weather data found for &quot;{searchedCity}&quot;
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      {result.map((forecast) => (
        <DailyForecastCard key={forecast.date} forecast={forecast} />
      ))}
    </div>
  );
};

export const WeatherForcastFallback = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
    {[...Array(6)].map((_, index) => (
      <DailyForecastCardSkeleton key={index} />
    ))}
  </div>
);
