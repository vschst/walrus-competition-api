import { ApiProperty } from '@nestjs/swagger';
import { GetAquatlonDataDTO } from './aquatlon.dto';
import { GetPublicOrderListItemDTO } from '@models/orders/dto/public-orders.dto';
import { IsArray } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { Serializable } from '@common/serializers/base.serializer';

export class GetPublicAquatlonListItemDTO extends GetAquatlonDataDTO {
  @Expose()
  @ApiProperty({ type: [GetPublicOrderListItemDTO] })
  @IsArray()
  @Type(() => GetPublicOrderListItemDTO)
  orders: GetPublicOrderListItemDTO[];
}

export class GetPublicAquatlonListResponseDTO {
  @ApiProperty({ type: () => [GetPublicAquatlonListItemDTO] })
  data: Serializable<GetPublicAquatlonListItemDTO[]>;
}
