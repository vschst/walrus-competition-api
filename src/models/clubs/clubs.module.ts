import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClubsController } from './clubs.controller';
import { ClubSerializerService } from './serializers/club.serializer';
import { ClubsService } from './clubs.service';
import { Club } from './entities/club.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Club])],
  providers: [ClubSerializerService, ClubsService],
  exports: [ClubSerializerService, ClubsService],
  controllers: [ClubsController],
})
export class ClubsModule {}
