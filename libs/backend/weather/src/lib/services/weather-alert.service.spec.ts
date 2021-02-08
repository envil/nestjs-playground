import { MongooseModule } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Test, TestingModule } from '@nestjs/testing';
import * as mongoose from 'mongoose';
import { WeatherAlertService } from './weather-alert.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/common';
import { WeatherAlert, WeatherAlertSchema } from '../model/weather.schema';

describe('WeatherAlertService', () => {
  let app: TestingModule;
  let mongod: MongoMemoryServer;
  let weatherAlertService: WeatherAlertService;

  afterEach(async () => {
    await app.close();
    await mongoose.disconnect();
    await mongod.stop();
  });

  beforeEach(async () => {
    mongod = new MongoMemoryServer({
      autoStart: true
    });
    app = await Test.createTestingModule({
      imports: [
        ConfigModule,
        HttpModule,
        MongooseModule.forRootAsync({
          useFactory: async () => ({
            uri: await mongod.getUri()
          })
        }),
        MongooseModule.forFeature([{ name: WeatherAlert.name, schema: WeatherAlertSchema }])
      ],
      providers: [ConfigService, WeatherAlertService]
    }).compile();
    weatherAlertService = app.get<WeatherAlertService>(WeatherAlertService);
  });

  it('should create new weather alert', async () => {
    await weatherAlertService.create({
      timestamp: 1000,
      cities: ['Some city'],
      warning: 'low'
    }).then((result) => {
      expect(result).toBeTruthy();
    });
  });

  it('should get undefined weather alert', async () => {
    await weatherAlertService.getLastAlert().then((result) => {
      expect(result).toBeUndefined();
    })
  });

  it('should get last weather alert', async () => {
    await weatherAlertService.create({
      timestamp: 1000,
      cities: ['Some city'],
      warning: 'low'
    });
    await weatherAlertService.getLastAlert().then((result) => {
      expect(result).toBeTruthy();
      expect(result.timestamp).toBe(1000);
    });
  });
});
