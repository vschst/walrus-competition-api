import { Injectable } from '@nestjs/common';
import { BaseSerializerService } from '@common/serializers/base.serializer';
import { Member } from '@models/members/entities/member.entity';
import { GetMemberDataDTO } from '@models/members/dto/member.dto';

@Injectable()
export class MemberSerializerService extends BaseSerializerService<
  Member,
  GetMemberDataDTO
> {
  public async serialize(member: Member): Promise<GetMemberDataDTO> {
    return {
      id: member.id,
      first_name: member.first_name,
      last_name: member.last_name,
      middle_name: member.middle_name,
      birthdate: member.birthdate,
      gender: member.gender,
      club_id: member.club.id,
      club_name: member.club.name,
      email: member.email,
      phone: member.phone,
    };
  }
}
