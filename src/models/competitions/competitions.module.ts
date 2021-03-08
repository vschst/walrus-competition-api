import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompetitionSerializer } from './serializers/competition.serializer';
import { CompetitionPublicOrdersSerializer } from './serializers/competition-public-orders.serializer';
import { CompetitionService } from './competition.service';
import { PublicRacesService } from '@models/races/public-races.service';
import { PublicRelaysService } from '@models/relays/public-relays.service';
import { PublicCryatlonsService } from '@models/cryatlons/public-cryatlons.service';
import { Competition } from './entities/competition.entity';
import { Race } from '@models/races/entities/race.entity';
import { Relay } from '@models/relays/entities/relay.entity';
import { Cryatlon } from '@models/cryatlons/entities/cryatlon.entity';
import { Order } from '@models/orders/entities/order.entity';
import { CompetitionsController } from './competitions.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Competition, Race, Relay, Cryatlon, Order]),
  ],
  providers: [
    CompetitionSerializer,
    CompetitionPublicOrdersSerializer,
    CompetitionService,
    PublicRacesService,
    PublicRelaysService,
    PublicCryatlonsService,
  ],
  controllers: [CompetitionsController],
})
export class CompetitionsModule {}
