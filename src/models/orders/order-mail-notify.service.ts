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
      birthdate,
      gender,
      email,
      phone,
      races,
      relays,
      cryathlon,
      additional,
    } = order;

    await this.mailerService.sendMail({
      to: this.mailConfigService.notifyEmail,
      subject: 'Новая заявка',
      template: 'order',
      context: {
        competition_name: competition.name,
        participant: {
          last_name,
          first_name,
          middle_name,
          club_name,
          birthdate: formattedDate(birthdate),
          age: ageFromBirthdate(birthdate),
          gender: genderText(gender),
          email,
          phone,
        },
        races: races.map((race: Race) => ({
          name: race.name,
          swimming_style: swimmingStyleText(race.swimming_style),
          gender: genderText(race.gender),
          age_group: ageGroupText(race.min_age, race.max_age),
          date: formattedDate(race.date),
        })),
        relays: relays.map((relay: Relay) => ({
          name: relay.name,
          count: relay.count,
          date: formattedDate(relay.date),
        })),
        cryathlon: cryathlon
          ? {
              name: cryathlon.name,
              run_distance: cryathlon.run_distance,
              ski_distance: cryathlon.ski_distance,
              water_distance: cryathlon.water_distance,
              barefoot_distance: cryathlon.barefoot_distance,
              gender: genderText(cryathlon.gender),
              date: formattedDate(cryathlon.date),
            }
          : null,
        additional,
      },
    });
  }
}
