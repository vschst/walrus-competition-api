import { ViewEntity, Connection, ViewColumn } from 'typeorm';
import { Order } from './order.entity';
import { Competition } from '@models/competitions/entities/competition.entity';
import {
  IsBoolean,
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Gender } from '@common/enums/gender.enum';
import { OrderStatuses } from '@models/orders/enums/order-statuses.enum';

@ViewEntity({
  name: 'orders_view',
  expression: (connection: Connection) =>
    connection
      .createQueryBuilder()
      .select('order.id', 'id')
      .addSelect('competition.id', 'competition_id')
      .addSelect('competition.name', 'competition_name')
      .addSelect('order.last_name', 'last_name')
      .addSelect('order.first_name', 'first_name')
      .addSelect('order.middle_name', 'middle_name')
      .addSelect('order.gender', 'gender')
      .addSelect('order.birthdate', 'birthdate')
      .addSelect('order.para_swimmer', 'para_swimmer')
      .addSelect('order.club_name', 'club_name')
      .addSelect('order.location', 'location')
      .addSelect('order.status', 'status')
      .addSelect('order.created_at', 'created_at')
      .addSelect('count(distinct order_race.race_id)', 'races_count')
      .addSelect('count(distinct order_relay.relay_id)', 'relays_count')
      .addSelect(
        'count(distinct order_cryatlon.cryatlon_id)',
        'cryatlons_count',
      )
      .from(Order, 'order')
      .innerJoin(
        Competition,
        'competition',
        'competition.id = order.competition.id',
      )
      .leftJoin('order_races', 'order_race', 'order_race.order_id = order.id')
      .leftJoin(
        'order_relays',
        'order_relay',
        'order_relay.order_id = order.id',
      )
      .leftJoin(
        'order_cryatlons',
        'order_cryatlon',
        'order_cryatlon.order_id = order.id',
      )
      .groupBy('order.id')
      .addGroupBy('competition.id')
      .addGroupBy('competition.name')
      .addGroupBy('order.last_name')
      .addGroupBy('order.first_name')
      .addGroupBy('order.middle_name')
      .addGroupBy('order.gender')
      .addGroupBy('order.birthdate')
      .addGroupBy('order.para_swimmer')
      .addGroupBy('order.club_name')
      .addGroupBy('order.location')
      .addGroupBy('order.status')
      .addGroupBy('order.created_at'),
})
export class OrderView {
  @IsInt()
  @ViewColumn()
  id: number;

  @IsInt()
  @ViewColumn()
  competition_id: number;

  @IsString()
  @IsNotEmpty()
  @ViewColumn()
  competition_name: string;

  @IsString()
  @IsNotEmpty()
  @ViewColumn()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  @ViewColumn()
  first_name: string;

  @IsString()
  @IsOptional()
  @ViewColumn()
  middle_name: string;

  @IsDate()
  @ViewColumn()
  birthdate: Date;

  @IsEnum(Gender)
  @ViewColumn()
  gender: Gender;

  @IsBoolean()
  @ViewColumn()
  para_swimmer: boolean;

  @IsString()
  @IsNotEmpty()
  @ViewColumn()
  club_name: string;

  @IsString()
  @IsNotEmpty()
  @ViewColumn()
  location: string;

  @IsInt()
  @ViewColumn()
  races_count: number;

  @IsInt()
  @ViewColumn()
  relays_count: number;

  @IsInt()
  @ViewColumn()
  cryatlons_count: number;

  @IsEnum(OrderStatuses)
  @ViewColumn()
  status: OrderStatuses;

  @IsDate()
  @ViewColumn()
  created_at: Date;

  constructor(orderView: Partial<OrderView>) {
    Object.assign(this, orderView);
  }
}
