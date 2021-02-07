import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WeatherAlert, WeatherAlertDocument } from '../model/weather.schema';
import { first, find, isEmpty } from 'lodash';
import { WeatherForecastDTO } from '../model/weather.dto';

@Injectable()
export class WeatherAlertService {
  constructor(@InjectModel(WeatherAlert.name) private weatherAlertModel: Model<WeatherAlertDocument>) {
  }

  isTemperatureBelowThreshold(weatherForecasts: WeatherForecastDTO[], threshold: number): boolean {
    return !isEmpty(find(weatherForecasts, (item: WeatherForecastDTO) => item.temperature < threshold));
  }

  async create(weatherAlert: WeatherAlert): Promise<WeatherAlert> {
    const createdWeatherAlert = new this.weatherAlertModel(weatherAlert);
    return createdWeatherAlert.save();
  }

  async getLastAlert(): Promise<WeatherAlert> {
    return first(await this.weatherAlertModel.find().sort({ _id: -1 }).limit(1));
  }
}
