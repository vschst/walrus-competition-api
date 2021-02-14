import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Order } from './entities/order.entity';
import { Race } from '@models/races/entities/race.entity';
import { Relay } from '@models/relays/entities/relay.entity';
import { Cryatlon } from '@models/cryatlons/entities/cryatlon.entity';
import { Gender } from '@common/enums/gender.enum';
import { CompetitionService } from '@models/competitions/competition.service';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    private readonly competitionService: CompetitionService,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Race)
    private raceRepository: Repository<Race>,
    @InjectRepository(Relay)
    private relayRepository: Repository<Relay>,
    @InjectRepository(Cryatlon)
    private cryathlonRepository: Repository<Cryatlon>,
  ) {}

  async createOrder(
    competition_id: number,
    first_name: string,
    last_name: string,
    middle_name: string | null,
    birthdate: Date,
    gender: Gender,
    email: string,
    phone: string,
    races: number[],
    relays: number[],
    cryathlons: number[],
    additional: string | null,
  ): Promise<[boolean, string, Order]> {
    try {
      const [
        isCompetitionExist,
        competition,
      ] = await this.competitionService.findOne(competition_id);

      if (!isCompetitionExist) {
        return [false, 'competition_not_found', null];
      }

      const availableRaces = await this.raceRepository.findByIds(races);
      const availableRelays = await this.relayRepository.findByIds(relays);
      const availableCryathlons = await this.cryathlonRepository.findByIds(
        cryathlons,
      );

      if (
        availableRaces.length +
          availableRelays.length +
          availableCryathlons.length ===
        0
      ) {
        return [false, 'distances_not_specified', null];
      }

      const order = new Order({
        competition,
        first_name,
        last_name,
        middle_name,
        birthdate,
        gender,
        email,
        phone,
        races: availableRaces,
        relays: availableRelays,
        cryathlons: availableCryathlons,
        additional,
        processed: false,
      });

      await order.save();

      return [true, '', order];
    } catch (error) {
      this.logger.error(error);

      return [false, 'exception_error', null];
    }
  }
}
