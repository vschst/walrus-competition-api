import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
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
  @IsBoolean()
  para_swimmer: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  club_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  birthdate: Date;

  @ApiProperty({ enum: Gender })
  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @ApiProperty()
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsPhoneNumber('RU')
  @IsString()
  @IsOptional()
  phone: string;

  @ApiProperty()
  @IsBoolean()
  need_skis: boolean;

  @ApiProperty({ type: [Number] })
  @IsOptional()
  @IsInt({ each: true })
  races: number[];

  @ApiProperty({ type: [Number] })
  @IsOptional()
  @IsInt({ each: true })
  relays: number[];

  @ApiProperty({ type: [Number] })
  @IsOptional()
  @IsInt({ each: true })
  cryatlons: number[];

  @ApiProperty({ type: [Number] })
  @IsOptional()
  @IsInt({ each: true })
  aquatlons: number[];

  @ApiProperty()
  @IsString()
  @IsOptional()
  additional: string;
}
