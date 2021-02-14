import { ApiProperty } from '@nestjs/swagger';
import { GetMemberDataDTO } from './member.dto';
import { Serializable } from '@common/serializers/base.serializer';

export class GetMembersListResponseDTO {
  @ApiProperty({ type: () => [GetMemberDataDTO] })
  data: Serializable<GetMemberDataDTO[]>;

  @ApiProperty()
  total: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  offset: number;
}
