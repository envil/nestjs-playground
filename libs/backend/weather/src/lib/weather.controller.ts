import { Controller, Get, Param, Query } from '@nestjs/common';
import { OpenWeatherMapService } from './services/open-weather-map.service';

@Controller('weather')
export class WeatherController {
  constructor(private weatherService: OpenWeatherMapService) {
  }

  @Get('5-day-forecast/:city')
  get5DayForecast(@Param('city') city: string) {
    return city;
  }
}
