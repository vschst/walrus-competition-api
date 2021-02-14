import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class GetRelayDataDTO {
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
  @IsInt()
  count: number;

  @ApiProperty()
  @IsDate()
  date: Date;
}
