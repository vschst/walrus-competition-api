import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppConfigService } from '@config/app/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const appConfig: AppConfigService = app.get('AppConfigService');
  const port = appConfig.port;

  await app.listen(port);

  return Promise.resolve(port);
}

bootstrap().then((port: number) => {
  console.log(`Walrus API started on port ${port}`);
});
