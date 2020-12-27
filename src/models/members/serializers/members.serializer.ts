import { Injectable } from '@nestjs/common';
import { BaseSerializerService } from '@common/serializers/base.serializer';
import { MemberView } from '@models/members/entities/member.view.entity';
import { GetMembersListItem } from '@models/members/dto/members.dto';

@Injectable()
export class MembersSerializerService extends BaseSerializerService<
  MemberView,
  GetMembersListItem
> {
  public async serialize(memberView: MemberView): Promise<GetMembersListItem> {
    return {
      id: memberView.id,
      last_name: memberView.last_name,
      first_name: memberView.first_name,
      middle_name: memberView.middle_name,
      birthdate: memberView.birthdate,
      gender: memberView.gender,
      club_id: memberView.club_id,
      club_name: memberView.club_name,
      email: memberView.email,
      phone: memberView.phone,
    };
  }
}
