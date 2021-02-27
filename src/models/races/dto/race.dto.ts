import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { SwimmingStyles } from '@common/enums/swimming-styles.enum';
import { Gender } from '@common/enums/gender.enum';
import { Expose } from 'class-transformer';

export class GetRaceDataDTO {
  @ApiProperty()
  @Expose()
  @IsInt()
  id: number;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @Expose()
  @IsInt()
  distance: number;

  @ApiProperty()
  @Expose()
  @IsEnum(SwimmingStyles)
  swimming_style: SwimmingStyles;

  @ApiProperty()
  @Expose()
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty()
  @Expose()
  @IsOptional()
  @IsInt()
  min_age: number;

  @ApiProperty()
  @Expose()
  @IsOptional()
  @IsInt()
  max_age: number;

  @ApiProperty()
  @Expose()
  @IsDate()
  date: Date;
}
