import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Gender } from '@common/enums/gender.enum';

export class GetCryathlonDataDTO {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsInt()
  run_distance: number;

  @ApiProperty()
  @IsInt()
  ski_distance: number;

  @ApiProperty()
  @IsInt()
  water_distance: number;

  @ApiProperty()
  @IsInt()
  barefoot_distance: number;

  @ApiProperty()
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty()
  @IsDate()
  date: Date;
}
