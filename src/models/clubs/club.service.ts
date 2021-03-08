import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Club } from '@models/clubs/entities/club.entity';

@Injectable()
export class ClubService {
  private readonly logger = new Logger(ClubService.name);

  constructor(
    @InjectRepository(Club)
    private clubRepository: Repository<Club>,
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

  async findOne(id: number, relations = false): Promise<[boolean, Club]> {
    const club = await this.clubRepository.findOne(id, {
      ...(relations && {
        relations: ['members'],
      }),
    });

    if (!club) {
      return [false, null];
    }

    return [true, club];
  }
}
