import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WeatherAlertDocument = WeatherAlert & Document;

@Schema()
export class WeatherAlert {
  @Prop() timestamp: number;
  @Prop() warning: string;
  @Prop([String]) cities: string[];
}

export const WeatherAlertSchema = SchemaFactory.createForClass(WeatherAlert);

