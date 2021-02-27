import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Relay } from './entities/relay.entity';
import { OrderStatuses } from '@models/orders/enums/order-statuses.enum';

@Injectable()
export class RelaysService {
  private readonly logger = new Logger(RelaysService.name);

  constructor(
    @InjectRepository(Relay)
    private relaysRepository: Repository<Relay>,
  ) {}

  async getAllPublic(id: number): Promise<Relay[]> {
    return await this.relaysRepository
      .createQueryBuilder('relay')
      .leftJoinAndSelect('relay.orders', 'order')
      .where('relay.competition_id = :id', { id })
      .andWhere('order.status != :rejected', {
        rejected: OrderStatuses.Rejected,
      })
      .getMany();
  }
}
