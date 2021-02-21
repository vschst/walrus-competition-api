import { Injectable } from '@nestjs/common';
import { BaseSerializerService } from '@common/serializers/base.serializer';
import { OrderView } from '@models/orders/entities/order-view.entity';
import { GetOrderListItemDTO } from '@models/orders/dto/orders.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class OrdersSerializerService extends BaseSerializerService<
  OrderView,
  GetOrderListItemDTO
> {
  public async serialize(orderView: OrderView): Promise<GetOrderListItemDTO> {
    return plainToClass(GetOrderListItemDTO, orderView);
  }
}
