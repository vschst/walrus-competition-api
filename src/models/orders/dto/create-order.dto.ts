import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { Gender } from '@common/enums/gender.enum';

export class CreateOrderDTO {
  @ApiProperty()
  @Transform(({ value: id }) => parseInt(id))
  @IsInt()
  competition_id: number;

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
  @IsEmail()
  @IsString()
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsPhoneNumber('RU')
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty()
  @IsArray()
  races: number[];

  @ApiProperty()
  @IsArray()
  relays: number[];

  @ApiProperty()
  @IsArray()
  cryathlons: number[];

  @ApiProperty()
  @IsString()
  @IsOptional()
  additional: string;
}
