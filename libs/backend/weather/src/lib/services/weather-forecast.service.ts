import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WeatherForecast, WeatherForecastDocument } from '../model/weather.schema';
import { Model } from 'mongoose';
import map from 'lodash/map';

@Injectable()
export class WeatherForecastService {
  constructor(@InjectModel(WeatherForecast.name) private weatherForecastModel: Model<WeatherForecastDocument>) {
  }

  async create(weatherForecast: WeatherForecast): Promise<WeatherForecast> {
    const createdWeatherForecast = new this.weatherForecastModel(weatherForecast);
    return createdWeatherForecast.save();
  }

  async addAll(weatherForecasts: WeatherForecast[]): Promise<any> {
    const bulkOps = map(weatherForecasts, weatherForecast => ({
        updateOne: {
          filter: { city: weatherForecast.city, timestamp: weatherForecast.timestamp },
          update: weatherForecast,
          upsert: true,
        }
      }
    ));
    return this.weatherForecastModel.bulkWrite(bulkOps).then(result => {
      return result;
    });
  }
}
