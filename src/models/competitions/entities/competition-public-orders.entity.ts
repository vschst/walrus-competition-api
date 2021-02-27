import {
  IsArray,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Order } from '@models/orders/entities/order.entity';
import { Race } from '@models/races/entities/race.entity';
import { Relay } from '@models/relays/entities/relay.entity';
import { Cryatlon } from '@models/cryatlons/entities/cryatlon.entity';

export class CompetitionPublicOrders {
  @IsInt()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsDate()
  start_date: Date;

  @IsDate()
  end_date: Date;

  @IsArray()
  @Type(() => Order)
  orders: Order[];

  @IsArray()
  @Type(() => Race)
  races: Race[];

  @IsArray()
  @Type(() => Relay)
  relays: Relay[];

  @IsArray()
  @Type(() => Cryatlon)
  cryatlons: Cryatlon[];

  constructor(competitionPublicOrders: Partial<CompetitionPublicOrders>) {
    Object.assign(this, competitionPublicOrders);
  }
}
