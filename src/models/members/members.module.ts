import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { MemberView } from './entities/member-view.entity';
import { MembersService } from './members.service';
import { MembersSerializerService } from './serializers/members.serializer';
import { MembersController } from './members.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Member, MemberView])],
  providers: [MembersSerializerService, MembersService],
  exports: [MembersSerializerService, MembersService],
  controllers: [MembersController],
})
export class MembersModule {}
