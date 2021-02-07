import { HttpModule, Module } from '@nestjs/common';
import { WeatherCron } from './crons/weather.cron';
import { OpenWeatherMapService } from './services/open-weather-map.service';
import { WeatherController } from './weather.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { WeatherAlert, WeatherAlertSchema } from './model/weather.schema';
import { WeatherAlertService } from './services/weather-alert.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
    MongooseModule.forFeature([{ name: WeatherAlert.name, schema: WeatherAlertSchema }])
  ],
  controllers: [WeatherController],
  providers: [
    WeatherCron,
    OpenWeatherMapService,
    WeatherAlertService
  ],
  exports: []
})
export class BackendWeatherModule {
}
