import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubsController } from './clubs.controller';
import { ClubSerializerService } from './serializers/club.serializer';
import { ClubsSerializerService } from './serializers/clubs.serializer';
import { ClubsService } from './clubs.service';
import { ClubService } from './club.service';
import { Club } from './entities/club.entity';
import { ClubView } from './entities/club-view.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Club, ClubView])],
  providers: [
    ClubSerializerService,
    ClubsSerializerService,
    ClubsService,
    ClubService,
  ],
  controllers: [ClubsController],
})
export class ClubsModule {}
