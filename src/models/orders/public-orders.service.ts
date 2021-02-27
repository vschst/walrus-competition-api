import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { Order } from '@models/orders/entities/order.entity';
import { OrderStatuses } from '@models/orders/enums/order-statuses.enum';

@Injectable()
export class PublicOrdersService {
  private readonly logger = new Logger(PublicOrdersService.name);

  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
  ) {}

  async findAll(id: number): Promise<Order[]> {
    return await this.orderRepository.find({
      order: {
        created_at: 'DESC',
      },
      where: {
        competition: { id },
        status: Not(OrderStatuses.Rejected),
      },
    });
  }
}
