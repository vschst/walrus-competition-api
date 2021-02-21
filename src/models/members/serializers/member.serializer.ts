import { Injectable } from '@nestjs/common';
import { BaseSerializerService } from '@common/serializers/base.serializer';
import { Member } from '@models/members/entities/member.entity';
import { GetMemberDataDTO } from '@models/members/dto/member.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class MemberSerializerService extends BaseSerializerService<
  Member,
  GetMemberDataDTO
> {
  public async serialize(member: Member): Promise<GetMemberDataDTO> {
    return plainToClass(GetMemberDataDTO, member)
  }
}
