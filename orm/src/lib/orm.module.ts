import { DynamicModule, Module, Provider } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as _ from 'lodash';

import * as Entities from './entities';

const entities = [..._.values(Entities)];

@Module({})
export class OrmModule {
  static forFeature(providers: Provider[]): DynamicModule {
    return {
      module: OrmModule,
      providers,
      exports: providers,
    };
  }

  static forRoot(): DynamicModule {
    return {
      module: OrmModule,
      imports: [
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
            return {
              type: 'postgres',
              host: configService.get('HOST'),
              port: +configService.get('POSTGRES_PORT'),
              username: configService.get('POSTGRES_USER'),
              password: configService.get('POSTGRES_PASSWORD'),
              database: configService.get('POSTGRES_DATABASE'),
              entities,
            };
          },
        }),
      ],
    };
  }
}
