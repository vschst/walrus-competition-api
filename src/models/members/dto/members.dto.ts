import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty, IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Serializable } from '@common/serializers/base.serializer';
import { Gender } from '@common/enums/gender.enum';

export class GetMembersListItem {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  middle_name: string;

  @ApiProperty()
  @IsDate()
  birthdate: Date;

  @ApiProperty()
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty()
  @IsInt()
  club_id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  club_name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  email: string;

  @ApiProperty()
  @IsPhoneNumber('RU')
  @IsOptional()
  @IsString()
  phone: string;
}

export class GetMembersListResponseDTO {
  @ApiProperty({ type: () => [GetMembersListItem] })
  data: Serializable<GetMembersListItem[]>;

  @ApiProperty()
  total: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  offset: number;
}
