import { Module } from '@nestjs/common';

import { ScheduleModule } from '@nestjs/schedule';
import { BackendWeatherModule } from '@credi-nord/backend/weather';
import { ConfigModule } from '@nestjs/config';
import { configurations } from '../environments/environment';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      load: [configurations],
    }),
    BackendWeatherModule,
  ],
  controllers: [],
  providers: [

  ],
})
export class AppModule {}
