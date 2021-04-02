import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  Column,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { IsInt, IsNotEmpty, IsString, IsDate, IsEnum } from 'class-validator';
import { Competition } from '@models/competitions/entities/competition.entity';
import { Order } from '@models/orders/entities/order.entity';
import { SwimmingStyles } from '@common/enums/swimming-styles.enum';

@Entity({ name: 'relays' })
export class Relay extends BaseEntity {
  @IsInt()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Competition, (competition) => competition.relays)
  @JoinColumn({ name: 'competition_id' })
  competition: Competition;

  @ManyToMany(() => Order, (order) => order.relays)
  @JoinTable({
    name: 'order_relays',
    joinColumn: {
      name: 'relay_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'order_id',
      referencedColumnName: 'id',
    },
  })
  orders: Order[];

  @IsString()
  @IsNotEmpty()
  @Column()
  name: string;

  @IsInt()
  @Column()
  distance: number;

  @IsEnum(SwimmingStyles)
  @IsNotEmpty()
  @Column({ type: 'enum', enum: SwimmingStyles })
  swimming_style: SwimmingStyles;

  @IsInt()
  @Column()
  count: number;

  @IsDate()
  @Column({ type: 'date' })
  date: Date;

  constructor(relay: Partial<Relay>) {
    super();
    Object.assign(this, relay);
  }
}
