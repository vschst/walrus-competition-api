import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Competition } from './entities/competition.entity';

@Injectable()
export class CompetitionService {
  private readonly logger = new Logger(CompetitionService.name);

  constructor(
    @InjectRepository(Competition)
    private competitionRepository: Repository<Competition>,
  ) {}

  async findOne(
    id: number,
    relations = false,
  ): Promise<[boolean, Competition]> {
    const competition = await this.competitionRepository.findOne(id, {
      ...(relations && {
        relations: ['races', 'relays', 'cryatlons', 'aquatlons'],
      }),
    });

    if (!competition) {
      return [false, null];
    }

    return [true, competition];
  }
}
