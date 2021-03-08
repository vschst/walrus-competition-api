import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { OrderView } from './entities/order-view.entity';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(
    @InjectRepository(OrderView)
    private ordersRepository: Repository<OrderView>,
  ) {}

  async findAll(
    limit = 10,
    offset = 0,
    sort = 'created_at',
    direction = 'desc',
    competition_id = null,
    gender = null,
    para_swimmer = null,
    need_skis = null,
    status = null,
    search = null,
  ): Promise<[OrderView[], number]> {
    return await this.ordersRepository.findAndCount({
      ...(limit >= 0 && { take: limit }),
      skip: offset,
      order: {
        [sort]: direction.toUpperCase(),
      },
      where: {
        ...(competition_id && { competition_id }),
        ...(gender && { gender }),
        ...(search && {
          last_name: ILike(`%${search}%`),
        }),
        ...(para_swimmer !== null && { para_swimmer }),
        ...(need_skis !== null && { need_skis }),
        ...(status && { status }),
      },
    });
  }
}
