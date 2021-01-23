import { HttpModule, Module } from '@nestjs/common';
import { WeatherCron } from './crons/weather.cron';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';

@Module({
  imports: [HttpModule],
  controllers: [WeatherController],
  providers: [
    WeatherCron,
    WeatherService,
  ],
  exports: [],
})
export class BackendWeatherModule {}
