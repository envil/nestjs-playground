import { Controller, Get } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {
  }

  @Get('5-day-forecast')
  get5DayForecast() {
    return this.weatherService.getForecast();
  }
}
