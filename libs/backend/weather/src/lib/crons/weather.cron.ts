import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import { OpenWeatherMapService } from '../services/open-weather-map.service';
import { filter, take, map as rxMap } from 'rxjs/operators';
import { CronCommand, CronJob } from 'cron';
import { WeatherAlertService } from '../services/weather-alert.service';
import getUnixTime from 'date-fns/getUnixTime';
import { forkJoin } from 'rxjs';
import map from 'lodash/map';

@Injectable()
export class WeatherCron {
  constructor(public configService: ConfigService,
              private schedulerRegistry: SchedulerRegistry,
              private openWeatherMapService: OpenWeatherMapService,
              private weatherAlertService: WeatherAlertService) {
    this.addCronJob('weatherForecast', this.getWeatherForecastCommand(this));
  }

  addCronJob(name: string, command: CronCommand) {
    const cronJob = new CronJob(this.configService.get(`cronJobs.${name}.pattern`), command);
    this.schedulerRegistry.addCronJob(name, cronJob);
    cronJob.start();
    // this.logger.warn(
    //   `job ${name} added for each minute at ${seconds} seconds!`,
    // );
  }

  getWeatherForecastCommand(scope: WeatherCron) {
    return () => {
      const cities: string[] = scope.configService.get('cities');
      forkJoin<string>(map(cities, city => scope.openWeatherMapService.getForecast(city).pipe(
        take(1),
        filter((result) => scope.weatherAlertService.isTemperatureBelowThreshold(result, scope.configService.get('lowerThreshold'))),
        rxMap(() => city),
      ))).subscribe(alertingCities => {
        scope.weatherAlertService.create({
          timestamp: getUnixTime(new Date()),
          warning: 'low',
          cities: alertingCities,
        })
      });
    };
  }

}
