import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Club } from '@models/clubs/entities/club.entity';
import { ClubView } from '@models/clubs/entities/club-view.entity';
import { Member } from './entities/member.entity';
import { MemberView } from './entities/member-view.entity';
import { MembersService } from './members.service';
import { ClubsService } from '@models/clubs/clubs.service';
import { MemberSerializerService } from './serializers/member.serializer';
import { MembersSerializerService } from './serializers/members.serializer';
import { MembersController } from './members.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Club, ClubView, Member, MemberView])],
  providers: [
    ClubsService,
    MemberSerializerService,
    MembersSerializerService,
    MembersService,
  ],
  exports: [
    ClubsService,
    MemberSerializerService,
    MembersSerializerService,
    MembersService,
  ],
  controllers: [MembersController],
})
export class MembersModule {}
