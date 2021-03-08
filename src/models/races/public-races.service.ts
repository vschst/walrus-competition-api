import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Race } from './entities/race.entity';
import { OrderStatuses } from '@models/orders/enums/order-statuses.enum';

@Injectable()
export class PublicRacesService {
  private readonly logger = new Logger(PublicRacesService.name);

  constructor(
    @InjectRepository(Race)
    private racesRepository: Repository<Race>,
  ) {}

  async findAll(id: number): Promise<Race[]> {
    return await this.racesRepository
      .createQueryBuilder('race')
      .leftJoinAndSelect('race.orders', 'order')
      .where('race.competition_id = :id', { id })
      .andWhere('order.status != :rejected', {
        rejected: OrderStatuses.Rejected,
      })
      .getMany();
  }
}
