import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThan } from 'typeorm';
import { Competition } from './entities/competition.entity';

@Injectable()
export class PublicCompetitionsService {
  private readonly logger = new Logger(PublicCompetitionsService.name);

  constructor(
    @InjectRepository(Competition)
    private competitionRepository: Repository<Competition>,
  ) {}

  async findAllUpcoming(): Promise<Competition[]> {
    return await this.competitionRepository.find({
      order: {
        start_date: 'DESC',
      },
      where: {
        start_date: MoreThan(new Date()),
      },
    });
  }
}
