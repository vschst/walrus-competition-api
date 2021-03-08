import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailConfigModule } from '@config/mail/config.module';
import { MailConfigService } from '@config/mail/config.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [MailConfigModule],
      inject: [MailConfigService],
      useFactory: (mailConfigService: MailConfigService) => {
        const {
          host,
          port,
          secure,
          username,
          password,
          from,
        } = mailConfigService;

        return {
          transport: {
            host,
            port,
            secure,
            auth: {
              user: username,
              pass: password,
            },
          },
          defaults: {
            from,
          },
          template: {
            dir: process.cwd() + '/src/mails/',
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true,
            },
          },
        };
      },
    }),
  ],
})
export class MailProviderModule {}
