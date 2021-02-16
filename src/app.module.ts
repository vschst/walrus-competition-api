import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppConfigModule } from '@config/app/config.module';
import { PostgresProviderModule } from '@providers/database/postgres/provider.module';
import { MailProviderModule } from '@providers/mail/provider.module';
import { ClubsModule } from '@models/clubs/clubs.module';
import { MembersModule } from '@models/members/members.module';
import { CompetitionsModule } from '@models/competitions/competitions.module';
import { OrdersModule } from '@models/orders/orders.module';
import { AuthModule } from '@auth/auth.module';

@Module({
  imports: [
    AppConfigModule,
    PostgresProviderModule,
    MailProviderModule,
    ClubsModule,
    MembersModule,
    CompetitionsModule,
    OrdersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
