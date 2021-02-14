import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { SwimmingStyles } from '@common/enums/swimming-styles.enum';
import { Gender } from '@common/enums/gender.enum';

export class GetRaceDataDTO {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsInt()
  distance: number;

  @ApiProperty()
  @IsEnum(SwimmingStyles)
  swimming_style: SwimmingStyles;

  @ApiProperty()
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty()
  @IsInt()
  min_age: number;

  @ApiProperty()
  @IsInt()
  max_age: number;

  @ApiProperty()
  @IsDate()
  date: Date;
}
