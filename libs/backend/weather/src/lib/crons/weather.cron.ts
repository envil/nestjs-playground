import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import { OpenWeatherMapService } from '../services/open-weather-map.service';
import { take } from 'rxjs/operators';

@Injectable()
export class WeatherCron {
  constructor(private configService: ConfigService,
              private weatherService: OpenWeatherMapService) {
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  getWeatherForecast(lookAheadRange = 5) {
    const cities: string[] = this.configService.get('cities');
    for (const city of cities) {
      this.weatherService.getForecast(city).pipe(take(1)).subscribe(result => {
        console.log(result);
      })
    }
  }

}
