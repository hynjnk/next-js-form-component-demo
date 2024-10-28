import {
  Cloud,
  Sun,
  CloudRain,
  CloudDrizzle,
  CloudSnow,
  Umbrella,
} from "lucide-react";

export function DailyForcastCard({
  forcast,
}: {
  forcast: {
    date: string;
    maxTemp: number;
    minTemp: number;
    rainProbability: number;
    weather: string;
  };
}) {
  return (
    <div
      key={forcast.date}
      className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden hover:border-gray-300"
    >
      <div className="p-6">
        <div className="flex flex-col items-center">
          <h3 className="text-sm font-medium text-gray-500 mb-4">
            {new Date(forcast.date).toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </h3>

          <div className="mb-4">
            <WeatherIcon weather={forcast.weather} />
          </div>

          <div className="flex items-center gap-3 text-2xl font-bold mb-3">
            <span className="text-red-500">{forcast.maxTemp}°</span>
            <span className="text-sm text-gray-400">/</span>
            <span className="text-blue-500">{forcast.minTemp}°</span>
          </div>

          <div className="flex items-center gap-1">
            <Umbrella className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-gray-600">
              {forcast.rainProbability}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const WeatherIcon = ({
  weather,
}: {
  weather: string;
  //   weather: "sunny" | "rainy" | "cloudy" | "drizzle" | "snowy";
}) => {
  switch (weather) {
    case "sunny":
      return <Sun className="w-12 h-12 text-yellow-500" />;
    case "rainy":
      return <CloudRain className="w-12 h-12 text-blue-500" />;
    case "cloudy":
      return <Cloud className="w-12 h-12 text-gray-400" />;
    case "drizzle":
      return <CloudDrizzle className="w-12 h-12 text-blue-400" />;
    case "snowy":
      return <CloudSnow className="w-12 h-12 text-blue-200" />;
    default:
      return <Sun className="w-12 h-12 text-yellow-500" />;
  }
};
