import { OpenWeatherForecastModel, OpenWeatherResponseModel } from './open-weather.model';

const openWeatherForecastModel: OpenWeatherForecastModel = {
  dt: 1000,
  main: {
    temp: 100
  }
};

const openWeatherResponseModel: OpenWeatherResponseModel = {
  list: [openWeatherForecastModel]
};


describe('OpenWeatherResponseModel', () => {
  it('should convert to WeatherForecastDTOs', function() {
    expect(OpenWeatherResponseModel.convertToWeatherForecastDTOs(openWeatherResponseModel)).toBeTruthy();
    expect(OpenWeatherResponseModel.convertToWeatherForecastDTOs(openWeatherResponseModel).length).toBe(1);
    expect(OpenWeatherResponseModel.convertToWeatherForecastDTOs(openWeatherResponseModel)[0]).toEqual({
      timestamp: 1000,
      temperature: 100
    });
  });

  it('should return null', function() {
    expect(OpenWeatherResponseModel.convertToWeatherForecastDTOs(null)).toBeTruthy();
  });
});
