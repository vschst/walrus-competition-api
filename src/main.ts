import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from '@config/app/config.service';
import { ValidationPipe, Logger } from '@nestjs/common';
import { setupSwagger } from '@config/swagger/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('bootstrap');

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      disableErrorMessages: false,
    }),
  );

  setupSwagger(app);

  const appConfig: AppConfigService = app.get('AppConfigService');
  const port = appConfig.port;

  await app.listen(port);

  const url = await app.getUrl();
  logger.log(`Application is running on ${url}, port: ${port}`);
}

bootstrap();
