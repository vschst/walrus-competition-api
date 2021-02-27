import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Race } from './entities/race.entity';
import { OrderStatuses } from '@models/orders/enums/order-statuses.enum';

@Injectable()
export class RacesService {
  private readonly logger = new Logger(RacesService.name);

  constructor(
    @InjectRepository(Race)
    private racesRepository: Repository<Race>,
  ) {}

  async getAllPublic(id: number): Promise<Race[]> {
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
