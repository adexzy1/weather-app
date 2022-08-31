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
      main: string;
      icon: string;
    }
  ];
  timezone: number;
  cod: number;
  zoneName: string;
}
