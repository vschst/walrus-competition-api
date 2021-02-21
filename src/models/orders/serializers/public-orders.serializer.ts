import { Injectable } from '@nestjs/common';
import { BaseSerializerService } from '@common/serializers/base.serializer';
import { OrderView } from '@models/orders/entities/order-view.entity';
import { GetPublicOrderListItemDTO } from '@models/orders/dto/public-orders.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class PublicOrdersSerializerService extends BaseSerializerService<
  OrderView,
  GetPublicOrderListItemDTO
> {
  public async serialize(
    orderView: OrderView,
  ): Promise<GetPublicOrderListItemDTO> {
    return plainToClass(GetPublicOrderListItemDTO, orderView, {
      excludeExtraneousValues: true,
    });
  }
}
