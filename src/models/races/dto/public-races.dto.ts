import { ApiProperty } from '@nestjs/swagger';
import { GetRaceDataDTO } from './race.dto';
import { GetPublicOrderListItemDTO } from '@models/orders/dto/public-orders.dto';
import { IsArray } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { Serializable } from '@common/serializers/base.serializer';

export class GetPublicRaceListItemDTO extends GetRaceDataDTO {
  @Expose()
  @ApiProperty()
  @IsArray()
  @Type(() => GetPublicOrderListItemDTO)
  orders: GetPublicOrderListItemDTO[];
}

export class GetPublicRaceListResponseDTO {
  @ApiProperty({ type: () => [GetPublicRaceListItemDTO] })
  data: Serializable<GetPublicRaceListItemDTO[]>;
}
