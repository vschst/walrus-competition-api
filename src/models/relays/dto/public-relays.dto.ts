import { ApiProperty } from '@nestjs/swagger';
import { GetRelayDataDTO } from './relay.dto';
import { GetPublicOrderListItemDTO } from '@models/orders/dto/public-orders.dto';
import { IsArray } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { Serializable } from '@common/serializers/base.serializer';

export class GetPublicRelayListItemDTO extends GetRelayDataDTO {
  @Expose()
  @ApiProperty({ type: [GetPublicOrderListItemDTO] })
  @IsArray()
  @Type(() => GetPublicOrderListItemDTO)
  orders: GetPublicOrderListItemDTO[];
}

export class GetPublicRelayListResponseDTO {
  @ApiProperty({ type: () => [GetPublicRelayListItemDTO] })
  data: Serializable<GetPublicRelayListItemDTO[]>;
}
