import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { Race } from '@models/races/entities/race.entity';
import { Relay } from '@models/relays/entities/relay.entity';
import { Cryatlon } from '@models/cryatlons/entities/cryatlon.entity';
import { Gender } from '@common/enums/gender.enum';
import { CompetitionService } from '@models/competitions/competition.service';
import { OrderMailNotifyService } from './order-mail-notify.service';
import { OrderStatuses } from './enums/order-statuses.enum';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);

  constructor(
    private readonly competitionService: CompetitionService,
    private readonly orderMailNotify: OrderMailNotifyService,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Race)
    private raceRepository: Repository<Race>,
    @InjectRepository(Relay)
    private relayRepository: Repository<Relay>,
    @InjectRepository(Cryatlon)
    private cryatlonRepository: Repository<Cryatlon>,
  ) {}

  async createOrder(
    competition_id: number,
    first_name: string,
    last_name: string,
    middle_name: string | null,
    birthdate: Date,
    gender: Gender,
    para_swimmer: boolean,
    club_name: string,
    location: string,
    email: string,
    phone: string,
    need_skis: boolean,
    races: number[] | null,
    relays: number[] | null,
    cryatlons: number[] | null,
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

      if (!races && !relays && !cryatlons) {
        return [false, 'no_distances', null];
      }

      const availableRaces = races
        ? await this.raceRepository.findByIds(races)
        : [];
      const availableRelays = relays
        ? await this.relayRepository.findByIds(relays)
        : [];
      const availableCryatlons = cryatlons
        ? await this.cryatlonRepository.findByIds(cryatlons)
        : [];

      const order = new Order({
        competition,
        first_name,
        last_name,
        middle_name,
        birthdate,
        para_swimmer,
        club_name,
        location,
        gender,
        email,
        phone,
        need_skis,
        races: availableRaces,
        relays: availableRelays,
        cryatlons: availableCryatlons,
        additional,
        status: OrderStatuses.New,
        created_at: new Date(),
      });

      await order.save();
      await this.orderMailNotify.sendNewOrderNotify(order);

      return [true, '', order];
    } catch (error) {
      this.logger.error(error);

      return [false, 'exception_error', null];
    }
  }

  async findOne(id: number, relations = false): Promise<[boolean, Order]> {
    const order = await this.orderRepository.findOne(id, {
      ...(relations && {
        relations: ['competition', 'races', 'relays', 'cryatlons'],
      }),
    });

    if (!order) {
      return [false, null];
    }

    return [true, order];
  }
}
