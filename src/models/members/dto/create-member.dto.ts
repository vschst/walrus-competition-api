import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Gender } from '@common/enums/gender.enum';

export class CreateMemberRequestDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  middle_name: string;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  birthdate: Date;

  @ApiProperty()
  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @ApiProperty()
  @IsInt()
  club_id: number;

  @ApiProperty()
  @IsEmail()
  @IsString()
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsPhoneNumber('RU')
  @IsString()
  @IsOptional()
  phone: string;
}
