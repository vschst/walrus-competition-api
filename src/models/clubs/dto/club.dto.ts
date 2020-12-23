import { ApiProperty } from '@nestjs/swagger';
import { Serializable } from '@common/serializers/responses/base.serializer';

export class GetClubDataDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  location: string;
}

export class GetClubResponseDTO {
  @ApiProperty({ type: () => GetClubDataDTO })
  data: Serializable<GetClubDataDTO>;
}

export class GetClubListResponseDTO {
  @ApiProperty({ type: () => [GetClubDataDTO] })
  data: Serializable<GetClubDataDTO[]>;

  @ApiProperty()
  total: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  offset: number;
}
