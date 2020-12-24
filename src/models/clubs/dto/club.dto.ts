import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Serializable } from '@common/serializers/base.serializer';

export class GetClubDataDTO {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
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
