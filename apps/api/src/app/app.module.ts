import { Module } from '@nestjs/common';

import { ScheduleModule } from '@nestjs/schedule';
import { BackendWeatherModule } from '@credi-nord/backend/weather';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: 'apps/api/src/environments/.development.env',
      isGlobal: true,
    }),
    BackendWeatherModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
