import { Injectable, Logger } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import { OpenWeatherMapService } from '../services/open-weather-map.service';
import { filter, take, map as rxMap } from 'rxjs/operators';
import { CronCommand, CronJob } from 'cron';
import { WeatherAlertService } from '../services/weather-alert.service';
import getUnixTime from 'date-fns/getUnixTime';
import { forkJoin, Observable } from 'rxjs';
import map from 'lodash/map';
import compact from 'lodash/compact';

@Injectable()
export class WeatherCron {
  private readonly logger = new Logger(WeatherCron.name);

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
    this.logger.log('cron job started');
  }

  getWeatherForecastCommand(scope: WeatherCron) {
    return () => {
      const cities: string[] = scope.configService.get('cities');
      const citiesWeatherCalls: Array<Observable<string>> = map(cities, city => scope.openWeatherMapService.getForecast(city).pipe(
        take(1),
        rxMap((result) => scope.weatherAlertService.isTemperatureBelowThreshold(result, scope.configService.get('lowerThreshold')) ? city : null)
      ));
      forkJoin(citiesWeatherCalls).subscribe(alertingCities => {
        scope.weatherAlertService.create({
          timestamp: getUnixTime(new Date()),
          warning: 'low',
          cities: compact(alertingCities)
        }).then(
          () => {
            this.logger.log('weather warning saved');
          },
          (error) => {
            this.logger.error('cannot save weather warning', error);
          }
        );
      });
    };
  }

}
