import { HttpService, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios'
import { OpenWeatherResponseModel } from '../model/open-weather.model';
import { map } from 'rxjs/operators';
import get from 'lodash/get';
import { ConfigService } from '@nestjs/config';
import { WeatherForecast } from '../model/weather.schema';


export abstract class IWeatherService {
  public abstract getForecast(city: string)
}

@Injectable()
export class OpenWeatherMapService implements IWeatherService {
  appId: string
  constructor(private httpService: HttpService,
              private configService: ConfigService) {
    this.appId = this.configService.get('openweathermap.appId');
  }

  getForecast(city: string): Observable<WeatherForecast[]> {
    return this.httpService.get<AxiosResponse<OpenWeatherResponseModel>>(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.appId}`).pipe(
      map((response) => get(response, 'data')),
      map(response => WeatherForecast.openWeatherResponseModelAdapter(response, city)),
    );
  }

}
