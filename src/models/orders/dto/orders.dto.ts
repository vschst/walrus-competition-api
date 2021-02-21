import { ApiProperty } from '@nestjs/swagger';
import { Serializable } from '@common/serializers/base.serializer';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Gender } from '@common/enums/gender.enum';
import { OrderStatuses } from '../enums/order-statuses.enum';
import { Transform } from 'class-transformer';

export class GetOrderListItemDTO {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsInt()
  competition_id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  competition_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  middle_name: string;

  @ApiProperty()
  @IsDate()
  birthdate: Date;

  @ApiProperty()
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty()
  @IsBoolean()
  para_swimmer: boolean;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  club_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty()
  @Transform(({ value: count }) => parseInt(count))
  @IsInt()
  races_count: number;

  @ApiProperty()
  @Transform(({ value: count }) => parseInt(count))
  @IsInt()
  relays_count: number;

  @ApiProperty()
  @Transform(({ value: count }) => parseInt(count))
  @IsInt()
  cryatlons_count: number;

  @ApiProperty()
  @IsEnum(OrderStatuses)
  status: OrderStatuses;

  @ApiProperty()
  @IsDate()
  created_at: Date;
}

export class GetOrdersListResponseDTO {
  @ApiProperty({ type: () => [GetOrderListItemDTO] })
  data: Serializable<GetOrderListItemDTO[]>;

  @ApiProperty()
  total: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  offset: number;
}
