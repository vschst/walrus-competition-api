import { Injectable } from '@nestjs/common';
import { BaseSerializerService } from '@common/serializers/base.serializer';
import { MemberView } from '@models/members/entities/member-view.entity';
import { GetMemberDataDTO } from '@models/members/dto/member.dto';

@Injectable()
export class MembersSerializerService extends BaseSerializerService<
  MemberView,
  GetMemberDataDTO
> {
  public async serialize(memberView: MemberView): Promise<GetMemberDataDTO> {
    return {
      id: memberView.id,
      last_name: memberView.last_name,
      first_name: memberView.first_name,
      middle_name: memberView.middle_name,
      birthdate: memberView.birthdate,
      age: memberView.age,
      gender: memberView.gender,
      club_id: memberView.club_id,
      club_name: memberView.club_name,
      email: memberView.email,
      phone: memberView.phone,
    };
  }
}
