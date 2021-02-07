import { Controller, Get} from '@nestjs/common';
import { WeatherAlertService } from './services/weather-alert.service';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { WeatherAlert } from './model/weather.schema';
import { pick } from 'lodash';

@Controller('weather')
export class WeatherController {
  constructor(private weatherAlertService: WeatherAlertService) {
  }

  @Get('cold-alert')
  getColdAlert() {
    return from(this.weatherAlertService.getLastAlert()).pipe(
      map((alert: WeatherAlert) => pick(alert, ['cities', 'warning']))
    );
  }
}
