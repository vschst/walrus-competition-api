import { ApiProperty } from '@nestjs/swagger';
import { GetCryatlonDataDTO } from './cryatlon.dto';
import { GetPublicOrderListItemDTO } from '@models/orders/dto/public-orders.dto';
import { IsArray } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { Serializable } from '@common/serializers/base.serializer';

export class GetPublicCryatlonListItemDTO extends GetCryatlonDataDTO {
  @Expose()
  @ApiProperty()
  @IsArray()
  @Type(() => GetPublicOrderListItemDTO)
  orders: GetPublicOrderListItemDTO[];
}

export class GetPublicCryatlonListResponseDTO {
  @ApiProperty({ type: () => [GetPublicCryatlonListItemDTO] })
  data: Serializable<GetPublicCryatlonListItemDTO[]>;
}
