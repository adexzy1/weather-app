export interface WeatherData {
  name: string;
  clouds: {
    all: number;
  };
  main: {
    humidity: number;
    temp: number;
  };
  wind: {
    speed: number;
  };
  weather: [
    {
      description: string;
      icon: string;
    }
  ];
  timezone: number;
  cod: number;
  zoneName: string;
}
