import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import { OpenWeatherMapService } from '../services/open-weather-map.service';
import { take } from 'rxjs/operators';
import { WeatherForecastService } from '../services/weather-forecast.service';

@Injectable()
export class WeatherCron {
  constructor(private configService: ConfigService,
              private openWeatherMapService: OpenWeatherMapService,
              private weatherForecastService: WeatherForecastService) {
  }

  @Cron(CronExpression.EVERY_10_MINUTES)
  getWeatherForecast(lookAheadRange = 5) {
    const cities: string[] = this.configService.get('cities');
    for (const city of cities) {
      this.openWeatherMapService.getForecast(city).pipe(take(1)).subscribe(result => {
        this.weatherForecastService.addAll(result);
      })
    }
  }

}
