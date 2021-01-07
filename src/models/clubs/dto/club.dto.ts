import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Serializable } from '@common/serializers/base.serializer';

export class GetClubDataDTO {
  @ApiProperty()
  @IsInt()
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
