import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Serializable } from '@common/serializers/base.serializer';
import { Type } from 'class-transformer';
import { GetMemberDataDTO } from '@models/members/dto/member.dto';

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

  @ApiProperty()
  @IsArray()
  @Type(() => GetMemberDataDTO)
  members: GetMemberDataDTO[];
}

export class GetClubResponseDTO {
  @ApiProperty({ type: () => GetClubDataDTO })
  data: Serializable<GetClubDataDTO>;
}
