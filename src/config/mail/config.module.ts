import * as Joi from 'joi';
import { Module } from '@nestjs/common';
import configuration from './configuration';
import { MailConfigService } from './config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        MAIL_DEBUG: Joi.boolean().default(false),
        MAIL_HOST: Joi.string().default('smtp.example.com'),
        MAIL_PORT: Joi.number().default(587),
        MAIL_SECURE: Joi.boolean().truthy('1').falsy('0'),
        MAIL_USERNAME: Joi.string().min(3),
        MAIL_PASSWORD: Joi.string().min(8),
        MAIL_FROM: Joi.string(),
        MAIL_NOTIFY_EMAIL: Joi.string().email(),
      }),
    }),
  ],
  providers: [ConfigService, MailConfigService],
  exports: [ConfigService, MailConfigService],
})
export class MailConfigModule {}
