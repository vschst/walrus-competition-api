import {
  Entity,
  ManyToOne,
  ManyToMany,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
} from 'typeorm';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Competition } from '@models/competitions/entities/competition.entity';
import { Gender } from '@common/enums/gender.enum';
import { Race } from '@models/races/entities/race.entity';
import { Relay } from '@models/relays/entities/relay.entity';
import { Cryatlon } from '@models/cryatlons/entities/cryatlon.entity';

@Entity({ name: 'orders' })
export class Order extends BaseEntity {
  @IsInt()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Competition, (competition) => competition.orders)
  @JoinColumn({ name: 'competition_id' })
  competition: Competition;

  @ManyToMany(() => Race, (race) => race.order)
  races: Race[];

  @ManyToMany(() => Relay, (relay) => relay.order)
  relays: Relay[];

  @ManyToMany(() => Cryatlon, (cryathlon) => cryathlon.order)
  cryathlons: Cryatlon[];

  @IsString()
  @IsNotEmpty()
  @Column()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  first_name: string;

  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  middle_name: string;

  @IsDate()
  @Column({ type: 'date' })
  birthdate: Date;

  @IsEnum(Gender)
  @IsNotEmpty()
  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @IsEmail()
  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  email: string;

  @IsPhoneNumber('RU')
  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  phone: string;

  @IsString()
  @IsOptional()
  @Column({ nullable: true })
  additional: string;

  @IsBoolean()
  @Column({ type: 'boolean' })
  processed: boolean;

  constructor(order: Partial<Order>) {
    super();
    Object.assign(this, order);
  }
}
