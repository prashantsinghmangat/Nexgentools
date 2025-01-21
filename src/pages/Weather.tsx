import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Cloud, Sun, CloudRain, Wind } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const API_KEY = '89ac49a67d6f4bbce138b5c2d4eb9633'; // This is a free API key for demo purposes

  const fetchWeather = async () => {
    if (!city) {
      toast({
        title: "Error",
        description: "Please enter a city name",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      
      if (data.cod === '404') {
        throw new Error('City not found');
      }
      
      setWeather(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch weather data. Please check the city name.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (weatherCode: string) => {
    switch (weatherCode) {
      case '01d':
      case '01n':
        return <Sun className="w-16 h-16 text-yellow-500" />;
      case '02d':
      case '02n':
      case '03d':
      case '03n':
      case '04d':
      case '04n':
        return <Cloud className="w-16 h-16 text-gray-500" />;
      case '09d':
      case '09n':
      case '10d':
      case '10n':
        return <CloudRain className="w-16 h-16 text-blue-500" />;
      default:
        return <Wind className="w-16 h-16 text-gray-500" />;
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md animate-fade-in">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Weather App</h1>
          <p className="text-muted-foreground">
            Check the weather in your city
          </p>
        </div>

        <div className="flex space-x-2">
          <Input
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && fetchWeather()}
          />
          <Button onClick={fetchWeather} disabled={loading}>
            {loading ? 'Loading...' : 'Search'}
          </Button>
        </div>

        {weather && (
          <div className="bg-white/30 backdrop-blur-lg rounded-lg p-6 text-center space-y-4 animate-fade-in">
            <div className="flex justify-center">
              {getWeatherIcon(weather.weather[0].icon)}
            </div>
            <h2 className="text-2xl font-bold">{weather.name}</h2>
            <div className="text-4xl font-bold">
              {Math.round(weather.main.temp)}°C
            </div>
            <div className="text-lg capitalize">
              {weather.weather[0].description}
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-500">Humidity</div>
                <div className="font-medium">{weather.main.humidity}%</div>
              </div>
              <div>
                <div className="text-gray-500">Wind Speed</div>
                <div className="font-medium">{weather.wind.speed} m/s</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;