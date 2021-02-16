import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Order } from './entities/order.entity';
import { genderText, formattedBirthdate, ageFromBirthdate } from '@common/helpers/mail.helper';

@Injectable()
export class OrderMailNotifyService {
  private readonly logger = new Logger(OrderMailNotifyService.name);

  constructor(private readonly mailerService: MailerService) {}

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
    } = order;

    await this.mailerService.sendMail({
      to: 'beautylife2000@gmail.com',
      subject: 'Новая заявка',
      template: 'order',
      context: {
        competition_name: competition.name,
        participant: {
          last_name,
          first_name,
          middle_name,
          club_name,
          birthdate: formattedBirthdate(birthdate),
          age: ageFromBirthdate(birthdate),
          gender: genderText(gender),
          email,
          phone,
        },
      },
    });
  }
}
