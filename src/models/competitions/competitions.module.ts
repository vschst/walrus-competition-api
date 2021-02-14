import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompetitionService } from './competition.service';
import { CompetitionSerializer } from './serializers/competition.serializer';
import { Competition } from './entities/competition.entity';
import { CompetitionsController } from './competitions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Competition])],
  providers: [CompetitionSerializer, CompetitionService],
  controllers: [CompetitionsController],
})
export class CompetitionsModule {}
