import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Race } from '@models/races/entities/race.entity';
import { Relay } from '@models/relays/entities/relay.entity';
import { Cryatlon } from '@models/cryatlons/entities/cryatlon.entity';
import { Aquatlon } from '@models/aquatlons/entities/aquatlon.entity';
import { Order } from '@models/orders/entities/order.entity';

@Entity({ name: 'competitions' })
export class Competition extends BaseEntity {
  @IsInt()
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Column()
  name: string;

  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  description: string;

  @IsDate()
  @Column({ type: 'date' })
  start_date: Date;

  @IsDate()
  @Column({ type: 'date' })
  end_date: Date;

  @OneToMany(() => Race, (race) => race.competition)
  races: Race[];

  @OneToMany(() => Relay, (relay) => relay.competition)
  relays: Relay[];

  @OneToMany(() => Cryatlon, (cryatlon) => cryatlon.competition)
  cryatlons: Cryatlon[];

  @OneToMany(() => Aquatlon, (aquatlon) => aquatlon.competition)
  aquatlons: Aquatlon[];

  @OneToMany(() => Order, (order) => order.competition)
  orders: Order[];

  constructor(competition: Partial<Competition>) {
    super();
    Object.assign(this, competition);
  }
}
