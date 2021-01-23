import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class WeatherCron {
  @Cron(CronExpression.EVERY_10_SECONDS)
  getWeatherForecast(lookAheadRange = 5) {
    console.log(`hello, ${lookAheadRange}`);
  }

}
