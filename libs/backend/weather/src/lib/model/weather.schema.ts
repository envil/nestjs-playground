import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { OpenWeatherForecastModel, OpenWeatherResponseModel } from './open-weather.model';
import map from 'lodash/map';
import get from 'lodash/get';


export type WeatherForecastDocument = WeatherForecast & Document;

@Schema()
export class WeatherForecast {
  @Prop() city?: string;
  @Prop({ index: true }) timestamp: number;
  @Prop() temperature: number;

  static openWeatherForecastModelAdapter(model: OpenWeatherForecastModel, city: string): WeatherForecast {
    return {
      city,
      timestamp: model?.dt,
      temperature: model?.main?.temp
    };
  }

  static openWeatherResponseModelAdapter(responseModel: OpenWeatherResponseModel, city: string): WeatherForecast[] {
    return map(get(responseModel, 'list'), (item) => WeatherForecast.openWeatherForecastModelAdapter(item, city));
  }
}

export const WeatherForecastSchema = SchemaFactory.createForClass(WeatherForecast);
