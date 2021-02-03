import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WeatherForecast, WeatherForecastDocument } from '../model/weather.schema';
import { Model } from 'mongoose';

@Injectable()
export class WeatherForecastService {
  constructor(@InjectModel(WeatherForecast.name) private weatherForecastModel: Model<WeatherForecastDocument>) {
  }

  async create(weatherForecast: WeatherForecast): Promise<WeatherForecast> {
    const createdWeatherForecast = new this.weatherForecastModel(weatherForecast);
    return createdWeatherForecast.save();
  }
}
