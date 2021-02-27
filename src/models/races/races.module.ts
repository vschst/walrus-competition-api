import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Race } from './entities/race.entity';
import { PublicRacesSerializerService } from './serializers/public-races.serializer';
import { PublicRacesService } from './public-races.service';
import { RacesController } from './races.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Race])],
  providers: [PublicRacesSerializerService, PublicRacesService],
  controllers: [RacesController],
})
export class RacesModule {}
