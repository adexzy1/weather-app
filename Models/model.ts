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
  weather: {
    description: string;
    icon: string;
  }[];
  timezone: number;
  cod: number;
  zoneName: string;
}

export type ACTIONTYPE =
  | { type: 'fetchData'; payLoad: WeatherData }
  | { type: 'showSearchBox'; payLoad: boolean }
  | { type: 'error'; payLoad: string };

export interface InitialState {
  data: WeatherData | null;
  showSearchBox: boolean;
  error: string;
}
