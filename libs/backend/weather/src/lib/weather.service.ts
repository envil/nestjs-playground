import { HttpService, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios'
import { OpenWeatherResponseModel } from './model/open-weather.model';
import { WeatherForecastModel } from './model/weather.model';
import { map } from 'rxjs/operators';
import get from 'lodash/get';


export abstract class IWeatherService {
  public abstract getForecast()
}

@Injectable()
export class WeatherService implements IWeatherService {
  constructor(private httpService: HttpService) {
  }

  getForecast(): Observable<WeatherForecastModel[]> {
    return this.httpService.get<AxiosResponse<OpenWeatherResponseModel>>('http://api.openweathermap.org/data/2.5/forecast?q=Helsinki,FI&appid=2be5213c6e457effb144c15c5fcb08b8').pipe(
      map((response) => get(response, 'data')),
      map(WeatherForecastModel.openWeatherResponseModelAdapter),
    );
  }

}
