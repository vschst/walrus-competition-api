import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Serializable } from '@common/serializers/base.serializer';
import { Gender } from '@common/enums/gender.enum';

export class GetMemberDataDTO {
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
  @IsBoolean()
  para_swimmer: boolean;

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

  @ApiProperty()
  @IsOptional()
  @IsString()
  location: string;
}

export class GetMemberResponseDTO {
  @ApiProperty({ type: () => GetMemberDataDTO })
  data: Serializable<GetMemberDataDTO>;
}
