import { HttpService, Injectable, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { OpenWeatherResponseModel } from '../model/open-weather.model';
import { catchError, map } from 'rxjs/operators';
import { get } from 'lodash';
import { ConfigService } from '@nestjs/config';
import { WeatherForecastDTO } from '../model/weather.dto';


export abstract class IWeatherService {
  public abstract getForecast(city: string)
}

@Injectable()
export class OpenWeatherMapService implements IWeatherService {
  private readonly logger = new Logger(OpenWeatherMapService.name);

  appId: string
  constructor(private httpService: HttpService,
              private configService: ConfigService) {
    this.appId = this.configService.get('openweathermap.appId');
  }

  getForecast(city: string): Observable<WeatherForecastDTO[]> {
    return this.httpService.get<AxiosResponse<OpenWeatherResponseModel>>(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.appId}`).pipe(
      map((response) => get(response, 'data')),
      map((result: OpenWeatherResponseModel) => OpenWeatherResponseModel.convertToWeatherForecastDTOs(result)),
      catchError(err => {
        this.logger.error(`failed to retrieve data for ${city}`, err);
        throw err;
      })
    );
  }
}
