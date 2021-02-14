import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigModule } from '@config/database/postgres/config.module';
import { PostgresConfigService } from '@config/database/postgres/config.service';

//  Entities
import { User } from '@models/users/entities/user.entity';
import { Club } from '@models/clubs/entities/club.entity';
import { ClubView } from '@models/clubs/entities/club-view.entity';
import { Member } from '@models/members/entities/member.entity';
import { MemberView } from '@models/members/entities/member-view.entity';
import { Competition } from '@models/competitions/entities/competition.entity';
import { Race } from '@models/races/entities/race.entity';
import { Relay } from '@models/relays/entities/relay.entity';
import { Cryatlon } from '@models/cryatlons/entities/cryatlon.entity';
import { Order } from '@models/orders/entities/order.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [PostgresConfigModule],
      inject: [PostgresConfigService],
      useFactory: async (postgresConfigService: PostgresConfigService) => {
        const {
          host,
          port,
          username,
          password,
          database,
        } = postgresConfigService;

        return {
          type: 'postgres',
          host,
          port,
          username,
          password,
          database,
          entities: [
            User,
            Club,
            ClubView,
            Member,
            MemberView,
            Competition,
            Race,
            Relay,
            Cryatlon,
            Order,
          ],
          synchronize: true,
        };
      },
    }),
  ],
})
export class PostgresProviderModule {}
