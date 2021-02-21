import { Injectable } from '@nestjs/common';
import { BaseSerializerService } from '@common/serializers/base.serializer';
import { Order } from '@models/orders/entities/order.entity';
import { GetOrderDataDTO } from '@models/orders/dto/order.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class OrderSerializerService extends BaseSerializerService<
  Order,
  GetOrderDataDTO
> {
  public async serialize(order: Order): Promise<GetOrderDataDTO> {
    return plainToClass(GetOrderDataDTO, order);
  }
}
