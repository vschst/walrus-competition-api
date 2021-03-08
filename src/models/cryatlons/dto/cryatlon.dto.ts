import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Gender } from '@common/enums/gender.enum';
import { Expose } from 'class-transformer';

export class GetCryatlonDataDTO {
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
  run_distance: number;

  @ApiProperty()
  @Expose()
  @IsInt()
  ski_distance: number;

  @ApiProperty()
  @Expose()
  @IsInt()
  water_distance: number;

  @ApiProperty()
  @Expose()
  @IsInt()
  barefoot_distance: number;

  @ApiProperty({ enum: Gender })
  @Expose()
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty()
  @Expose()
  @IsDate()
  date: Date;
}
