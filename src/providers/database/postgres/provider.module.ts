import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigModule } from '@config/database/postgres/config.module';
import { PostgresConfigService } from '@config/database/postgres/config.service';

//  Entities
import { User } from '@models/users/entities/user.entity';
import { Club } from '@models/clubs/entities/club.entity';
import { ClubView } from '@models/clubs/entities/club-view.entity';
import { Member } from '@models/members/entities/member.entity';
import { MemberView} from '@models/members/entities/member-view.entity';

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
          entities: [User, Club, ClubView, Member, MemberView],
          synchronize: false,
        };
      },
    }),
  ],
})
export class PostgresProviderModule {}
