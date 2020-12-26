import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Club } from './entities/club.entity';
import { ClubView } from './entities/club.view.entity';

@Injectable()
export class ClubsService {
  private readonly logger = new Logger(ClubsService.name);

  constructor(
    @InjectRepository(Club)
    private clubRepository: Repository<Club>,
    @InjectRepository(ClubView)
    private clubViewRepository: Repository<ClubView>,
  ) {}

  async createClub(name: string, location: string): Promise<[boolean, Club]> {
    try {
      const user = new Club({ name, location });

      await user.save();

      return [true, user];
    } catch (error) {
      this.logger.error(error);

      return [false, null];
    }
  }

  async findOne(id: number): Promise<[boolean, Club]> {
    const club = await this.clubRepository.findOne(id);

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
    search = '',
  ): Promise<[ClubView[], number]> {
    return await this.clubViewRepository.findAndCount({
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
