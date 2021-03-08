import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Club } from '@models/clubs/entities/club.entity';
import { Member } from './entities/member.entity';
import { MemberView } from './entities/member-view.entity';
import { MemberService } from '@models/members/member.service';
import { MembersService } from './members.service';
import { ClubService } from '@models/clubs/club.service';
import { MemberSerializerService } from './serializers/member.serializer';
import { MembersSerializerService } from './serializers/members.serializer';
import { MembersController } from './members.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Club, Member, MemberView])],
  providers: [
    ClubService,
    MemberSerializerService,
    MembersSerializerService,
    MemberService,
    MembersService,
  ],
  controllers: [MembersController],
})
export class MembersModule {}
