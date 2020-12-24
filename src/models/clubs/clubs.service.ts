import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Club } from './entities/club.entity';

@Injectable()
export class ClubsService {
  private readonly logger = new Logger(ClubsService.name);

  constructor(
    @InjectRepository(Club)
    private clubsRepository: Repository<Club>,
  ) {}

  async findOne(id: string): Promise<Club> {
    const club = await this.clubsRepository.findOne(id);

    if (!club) {
      throw new NotFoundException({
        error: 'Club not found',
      });
    }

    return club;
  }
}
