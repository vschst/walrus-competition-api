import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailConfigModule } from '@config/mail/config.module';
import { Competition } from '@models/competitions/entities/competition.entity';
import { Order } from './entities/order.entity';
import { OrderView } from './entities/order-view.entity';
import { OrderService } from './order.service';
import { PublicOrdersService } from './public-orders.service';
import { OrdersService } from './orders.service';
import { OrderSerializerService } from './serializers/order.serializer';
import { OrdersSerializerService } from './serializers/orders.serializer';
import { PublicOrdersSerializerService } from './serializers/public-orders.serializer';
import { MailConfigService } from '@config/mail/config.service';
import { OrderMailNotifyService } from './order-mail-notify.service';
import { CompetitionService } from '@models/competitions/competition.service';
import { OrdersController } from './orders.controller';
import { Race } from '@models/races/entities/race.entity';
import { Relay } from '@models/relays/entities/relay.entity';
import { Cryatlon } from '@models/cryatlons/entities/cryatlon.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Competition,
      Order,
      OrderView,
      Race,
      Relay,
      Cryatlon,
    ]),
    MailConfigModule,
  ],
  providers: [
    CompetitionService,
    MailConfigService,
    OrderMailNotifyService,
    OrderService,
    OrdersService,
    PublicOrdersService,
    OrderSerializerService,
    OrdersSerializerService,
    PublicOrdersSerializerService
  ],
  controllers: [OrdersController],
})
export class OrdersModule {}
