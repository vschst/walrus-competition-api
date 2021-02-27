import { Injectable } from '@nestjs/common';
import { BaseSerializerService } from '@common/serializers/base.serializer';
import { Order } from '@models/orders/entities/order.entity';
import { GetPublicOrderListItemDTO } from '@models/orders/dto/public-orders.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class PublicOrdersSerializerService extends BaseSerializerService<
  Order,
  GetPublicOrderListItemDTO
> {
  public async serialize(order: Order): Promise<GetPublicOrderListItemDTO> {
    return plainToClass(GetPublicOrderListItemDTO, order, {
      excludeExtraneousValues: true,
    });
  }
}
