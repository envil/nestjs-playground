import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule } from '@nestjs/common';
import { OpenWeatherMapService } from './open-weather-map.service';
import { AxiosResponse } from 'axios';
import { OpenWeatherResponseModel } from '../model/open-weather.model';
import mockAxios from 'jest-mock-axios';

describe('OpenWeatherMapService', () => {
  let app: TestingModule;
  let openWeatherMapService: OpenWeatherMapService;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [ConfigModule, HttpModule],
      providers: [ConfigService, OpenWeatherMapService]
    }).compile();
    openWeatherMapService = app.get<OpenWeatherMapService>(OpenWeatherMapService);
  });
  afterEach(() => {
    mockAxios.reset();
  })

  it('should get Forecast', function() {
    const data: OpenWeatherResponseModel = {
      list: [
        {
          dt: 12345678,
          main: {
            temp: 273
          }
        },
        {
          dt: 12345679,
          main: {
            temp: 274
          }
        }
      ]
    };
    const response: AxiosResponse<OpenWeatherResponseModel> = {
      data,
      headers: {},
      config: {},
      status: 200,
      statusText: 'OK'
    };


    openWeatherMapService.getForecast('Some city').subscribe(result => {
      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({
        timestamp: data.list[0].dt,
        temperature: data.list[0].main.temp,
      });
    });
    expect(mockAxios.get).toHaveBeenCalled();
    mockAxios.mockResponse(response);
  });

  it('should throw NetworkError', function() {
    const response: AxiosResponse<OpenWeatherResponseModel> = {
      data: null,
      headers: {},
      config: {},
      status: 400,
      statusText: 'ERROR'
    };
    openWeatherMapService.getForecast('Some city').subscribe(() => {
      return;
    }, (error: Error) => {
      expect(mockAxios.get).toHaveBeenCalled();
      expect(error.message).toBe('Network error');
    });
    mockAxios.mockError(new Error('Network error'));
  });
});
