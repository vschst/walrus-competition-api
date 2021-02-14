import { ApiProperty } from '@nestjs/swagger';
import { GetClubDataDTO } from './club.dto';
import { Serializable } from '@common/serializers/base.serializer';

export class GetClubsListResponseDTO {
  @ApiProperty({ type: () => [GetClubDataDTO] })
  data: Serializable<GetClubDataDTO[]>;

  @ApiProperty()
  total: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  offset: number;
}
