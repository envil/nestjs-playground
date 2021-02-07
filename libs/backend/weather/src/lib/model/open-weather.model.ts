import { WeatherForecastDTO } from './weather.dto';
import { map } from 'lodash';

export class OpenWeatherResponseModel {
  // cod: string;
  // message: number;
  list: OpenWeatherForecastModel[];


  static convertToWeatherForecastDTOs(model: OpenWeatherResponseModel): WeatherForecastDTO[] {
    return map(model?.list, OpenWeatherForecastModel.convertToWeatherForecastDTO);
  }

}

export class OpenWeatherForecastModel {
  dt: number;
  main: OpenWeatherMainForecastModel;

  static convertToWeatherForecastDTO(model: OpenWeatherForecastModel): WeatherForecastDTO {
    return {
      timestamp: model?.dt,
      temperature: model?.main?.temp,
    };
  }
}

export class OpenWeatherMainForecastModel {
  temp: number;
  // temp_min: number;
  // temp_max: number;
  // pressure: number;
  // sea_level: number;
  // grnd_level: number;
  // humidity: number;
  // temp_kf: number;
}
