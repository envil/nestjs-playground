import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import { WeatherService } from '../weather.service';

@Injectable()
export class WeatherCron {
  constructor(private configService: ConfigService,
              private weatherService: WeatherService) {
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  getWeatherForecast(lookAheadRange = 5) {
    const cities: string[] = this.configService.get('cities');
    for (const city of cities) {
      console.log(city);
    }
  }

}
