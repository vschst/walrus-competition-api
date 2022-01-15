import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Order } from './entities/order.entity';
import {
  genderText,
  formattedDate,
  ageFromBirthdate,
  swimmingStyleText,
  ageGroupText,
} from '@common/helpers/mail.helper';
import { Race } from '@models/races/entities/race.entity';
import { Relay } from '@models/relays/entities/relay.entity';
import { MailConfigService } from '@config/mail/config.service';
import { Cryatlon } from '@models/cryatlons/entities/cryatlon.entity';
import { Aquatlon } from '@models/aquatlons/entities/aquatlon.entity';

@Injectable()
export class OrderMailNotifyService {
  private readonly logger = new Logger(OrderMailNotifyService.name);

  constructor(
    private readonly mailConfigService: MailConfigService,
    private readonly mailerService: MailerService,
  ) {}

  async sendNewOrderNotify(order: Order): Promise<void> {
    const {
      competition,
      last_name,
      first_name,
      middle_name,
      club_name,
      location,
      birthdate,
      gender,
      para_swimmer,
      email,
      phone,
      need_skis,
      races,
      relays,
      cryatlons,
      aquatlons,
      additional,
    } = order;

    await this.mailerService.sendMail({
      to: this.mailConfigService.notifyEmail,
      subject: 'Новая заявка',
      template: 'order',
      context: {
        competition_name: competition.name,
        participant: {
          para_swimmer,
          last_name,
          first_name,
          middle_name,
          club_name,
          location,
          birthdate: formattedDate(birthdate),
          age: ageFromBirthdate(birthdate),
          gender: genderText(gender),
          email,
          phone,
          need_skis,
        },
        races: races.map((race: Race) => ({
          name: race.name,
          distance: race.distance,
          swimming_style: swimmingStyleText(race.swimming_style),
          para_swimmers: race.para_swimmers,
          gender: genderText(race.gender),
          age_group: ageGroupText(race.min_age, race.max_age),
          date: formattedDate(race.date),
        })),
        relays: relays.map((relay: Relay) => ({
          name: relay.name,
          distance: relay.distance,
          swimming_style: swimmingStyleText(relay.swimming_style),
          count: relay.count,
          date: formattedDate(relay.date),
        })),
        cryatlons: cryatlons.map((cryatlon: Cryatlon) => ({
          name: cryatlon.name,
          gender: genderText(cryatlon.gender),
          date: formattedDate(cryatlon.date),
        })),
        aquatlons: aquatlons.map((aquatlon: Aquatlon) => ({
          name: aquatlon.name,
          gender: genderText(aquatlon.gender),
          date: formattedDate(aquatlon.date),
        })),
        additional,
      },
    });
  }
}
