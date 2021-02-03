import { HttpModule, Module } from '@nestjs/common';
import { WeatherCron } from './crons/weather.cron';
import { OpenWeatherMapService } from './services/open-weather-map.service';
import { WeatherController } from './weather.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { WeatherForecast, WeatherForecastSchema } from './model/weather.schema';
import { WeatherForecastService } from './services/weather-forecast.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
    MongooseModule.forFeature([{ name: WeatherForecast.name, schema: WeatherForecastSchema }])
  ],
  controllers: [WeatherController],
  providers: [
    WeatherCron,
    OpenWeatherMapService,
    WeatherForecastService
  ],
  exports: []
})
export class BackendWeatherModule {
}
