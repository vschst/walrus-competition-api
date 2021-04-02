import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { SwimmingStyles } from '@common/enums/swimming-styles.enum';

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
  @IsEnum(SwimmingStyles)
  swimming_style: SwimmingStyles;

  @ApiProperty()
  @Expose()
  @IsInt()
  count: number;

  @ApiProperty()
  @Expose()
  @IsDate()
  date: Date;
}
