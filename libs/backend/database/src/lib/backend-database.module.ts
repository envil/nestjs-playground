import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';

@Module({
  controllers: [],
  providers: [],
  exports: [],
})
export class BackendDatabaseModule {
  public static getNoSqlConnectionOptions(config: ConfigService): MongooseModuleOptions {
    const connectionString = config.get('databases.mongo');

    if (!connectionString) {
      throw new Error('Database config is missing');
    }
    return {
      uri: connectionString,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  }
  public static forRoot(): DynamicModule {
    return {
      module: BackendDatabaseModule,
      imports: [
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => BackendDatabaseModule.getNoSqlConnectionOptions(configService),
          inject: [ConfigService],
        }),
      ],
      controllers: [],
      providers: [],
      exports: [],
    };
  }
}
