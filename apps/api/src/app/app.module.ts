import { Module } from '@nestjs/common';

import { ScheduleModule } from '@nestjs/schedule';
import { BackendWeatherModule } from '@credi-nord/backend/weather';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configurations } from '../environments/environment';
import { BackendDatabaseModule } from '@credi-nord/backend/database';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      load: [configurations],
    }),
    BackendDatabaseModule.forRoot(),
    BackendWeatherModule,
  ],
  controllers: [],
  providers: [

  ],
})
export class AppModule {}
