import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

export class GetRelayDataDTO {
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
  @IsInt()
  count: number;

  @ApiProperty()
  @Expose()
  @IsDate()
  date: Date;
}
