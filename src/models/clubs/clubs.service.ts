import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { ClubView } from './entities/club-view.entity';

@Injectable()
export class ClubsService {
  private readonly logger = new Logger(ClubsService.name);

  constructor(
    @InjectRepository(ClubView)
    private clubsRepository: Repository<ClubView>,
  ) {}

  async findOne(id: number): Promise<[boolean, ClubView]> {
    const club = await this.clubsRepository.findOne({ id });

    if (!club) {
      return [false, null];
    }

    return [true, club];
  }

  async findAll(
    limit = 10,
    offset = 0,
    sort = 'name',
    direction = 'desc',
    search = null,
  ): Promise<[ClubView[], number]> {
    return await this.clubsRepository.findAndCount({
      ...(limit >= 0 && { take: limit }),
      skip: offset,
      order: {
        [sort]: direction.toUpperCase(),
      },
      ...(search && {
        name: Like(`%${search}%`),
      }),
    });
  }
}
