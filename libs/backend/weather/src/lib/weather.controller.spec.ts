import { WeatherController } from './weather.controller';
import { WeatherAlertService } from './services/weather-alert.service';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { MongooseModule } from '@nestjs/mongoose';
import { WeatherAlert, WeatherAlertSchema } from './model/weather.schema';

describe('WeatherController', () => {
  let weatherController: WeatherController;

  beforeEach(async () => {
    const weatherAlertService = {
      getLastAlert: async () => {
        return {
          timestamp: 1000,
          cities: ['Some city'],
          warning: 'low',
        }
      }
    }
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WeatherController],
      providers: [{
        provide: WeatherAlertService,
        useValue: weatherAlertService
      }],
    }).compile();
    weatherController = app.get<WeatherController>(WeatherController);
  });

  describe('cold-alert', () => {
    it('should return last result', async () => {
      const response = await weatherController.getColdAlert();
      expect(response).toBeTruthy();
      response.subscribe(result => {
        expect(result).toBeTruthy();
        expect(result.cities).toHaveLength(1);
        expect(result.warning).toBe('low');
      })
    });
  })
})
