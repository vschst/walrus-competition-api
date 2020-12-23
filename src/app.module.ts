import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppConfigModule } from '@config/app/config.module';
import { PostgresProviderModule } from '@providers/database/postgres/provider.module';
import { ClubsModule } from '@models/clubs/clubs.module';

@Module({
  imports: [AppConfigModule, PostgresProviderModule, ClubsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
