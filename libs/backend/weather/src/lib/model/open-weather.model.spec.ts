import { OpenWeatherForecastModel, OpenWeatherResponseModel } from './open-weather.model';

describe('OpenWeatherResponseModel', () => {
  const openWeatherForecastModel: OpenWeatherForecastModel = {
    dt: 1000,
    main: {
      temp: 100
    }
  };

  const openWeatherResponseModel: OpenWeatherResponseModel = {
    list: [openWeatherForecastModel]
  };

  it('should convert to WeatherForecastDTOs', function() {
    expect(OpenWeatherResponseModel.convertToWeatherForecastDTOs(openWeatherResponseModel)).toHaveLength(1);
    expect(OpenWeatherResponseModel.convertToWeatherForecastDTOs(openWeatherResponseModel)[0]).toEqual({
      timestamp: 1000,
      temperature: 100
    });
  });

  it('should accept null', function() {
    expect(OpenWeatherResponseModel.convertToWeatherForecastDTOs(null)).toBeTruthy();
  });
});
