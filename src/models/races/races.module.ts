import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Race } from './entities/race.entity';
import { PublicRacesSerializerService } from './serializers/public-races.serializer';
import { RacesService } from './races.service';
import { RacesController } from './races.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Race])],
  providers: [PublicRacesSerializerService, RacesService],
  controllers: [RacesController],
})
export class RacesModule {}
