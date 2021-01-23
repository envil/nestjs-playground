export class OpenWeatherResponseModel {
  cod: string;
  message: number;
  list: OpenWeatherForecastModel[];
}

export class OpenWeatherForecastModel {
  dt: number;
  main: OpenWeatherMainForecastModel;
}

export class OpenWeatherMainForecastModel {
  temp: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}
