import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Aquatlon } from './entities/aquatlon.entity';
import { OrderStatuses } from '@models/orders/enums/order-statuses.enum';

@Injectable()
export class PublicAquatlonsService {
  private readonly logger = new Logger(PublicAquatlonsService.name);

  constructor(
    @InjectRepository(Aquatlon)
    private aquatlonsRepository: Repository<Aquatlon>,
  ) {}

  async findAll(id: number): Promise<Aquatlon[]> {
    return await this.aquatlonsRepository
      .createQueryBuilder('aquatlon')
      .leftJoinAndSelect('aquatlon.orders', 'order')
      .where('aquatlon.competition_id = :id', { id })
      .andWhere('order.status != :rejected', {
        rejected: OrderStatuses.Rejected,
      })
      .getMany();
  }
}
