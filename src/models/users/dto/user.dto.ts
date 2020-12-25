import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsNotEmpty } from 'class-validator';
import { Serializable } from '@common/serializers/base.serializer';

export class GetUserDataDTO {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class GetUserResponseDTO {
  @ApiProperty({ type: () => GetUserDataDTO })
  data: Serializable<GetUserDataDTO>;
}