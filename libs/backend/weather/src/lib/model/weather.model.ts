import { OpenWeatherForecastModel, OpenWeatherResponseModel } from './open-weather.model';
import map from 'lodash/map';
import get from 'lodash/get';

export class WeatherForecastModel {
  timestamp: number;
  temperature: number;

  static openWeatherForecastModelAdapter(model: OpenWeatherForecastModel): WeatherForecastModel {
    return {
      timestamp: model?.dt,
      temperature: model?.main?.temp,
    }
  }

  static openWeatherResponseModelAdapter(responseModel: OpenWeatherResponseModel): WeatherForecastModel[] {
    return map(get(responseModel, 'list'), WeatherForecastModel.openWeatherForecastModelAdapter);
  }
}
