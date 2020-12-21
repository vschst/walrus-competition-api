import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import configuration from './configuration';
import { PostgresConfigService } from './config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        PG_HOST: Joi.string().default('localhost'),
        PG_PORT: Joi.number().default(5432),
        PG_USERNAME: Joi.string().min(3),
        PG_PASSWORD: Joi.string().min(8),
        PG_DATABASE: Joi.string(),
      }),
    }),
  ],
  providers: [ConfigService, PostgresConfigService],
  exports: [ConfigService, PostgresConfigService],
})
export class PostgresConfigModule {}
