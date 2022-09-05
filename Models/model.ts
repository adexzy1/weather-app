export interface WeatherData {
  current: {
    clouds: number;
    humidity: number;
    temp: number;
    wind_speed: number;
    weather: {
      description: string;
      icon: string;
    }[];
  };
  timezone: string;
  name: string;
  country: string;
}

export type Coordinates = {
  lat: number;
  lon: number;
  country: string;
  name: string;
}[];

export type ACTIONTYPE =
  | { type: 'fetchData'; payLoad: WeatherData }
  | { type: 'showSearchBox'; payLoad: boolean }
  | { type: 'error'; payLoad: string }
  | { type: 'isLoading'; payLoad: boolean };

export interface InitialState {
  data: WeatherData | null;
  showSearchBox: boolean;
  error: string;
  isLoading: boolean;
}
