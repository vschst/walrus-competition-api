import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { OrderStatuses } from '@models/orders/enums/order-statuses.enum';
import { Serializable } from '@common/serializers/base.serializer';
import { Expose } from 'class-transformer';

export class GetPublicOrderListItemDTO {
  @ApiProperty()
  @Expose()
  @IsInt()
  id: number;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty()
  @Expose()
  @IsOptional()
  @IsString()
  middle_name: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsNotEmpty()
  club_name: string;

  @ApiProperty()
  @Expose()
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ enum: OrderStatuses })
  @Expose()
  @IsEnum(OrderStatuses)
  status: OrderStatuses;
}

export class GetPublicOrdersListResponseDTO {
  @ApiProperty({ type: () => [GetPublicOrderListItemDTO] })
  data: Serializable<GetPublicOrderListItemDTO[]>;
}
