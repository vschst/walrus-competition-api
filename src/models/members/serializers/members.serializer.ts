import { Injectable } from '@nestjs/common';
import { BaseSerializerService } from '@common/serializers/base.serializer';
import { MemberView } from '@models/members/entities/member-view.entity';
import { GetMemberListItemDTO } from '@models/members/dto/members.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class MembersSerializerService extends BaseSerializerService<
  MemberView,
  GetMemberListItemDTO
> {
  public async serialize(
    memberView: MemberView,
  ): Promise<GetMemberListItemDTO> {
    return plainToClass(GetMemberListItemDTO, memberView, {
      excludeExtraneousValues: true,
    });
  }
}
