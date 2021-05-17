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
import { IsDate, IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Competition } from '@models/competitions/entities/competition.entity';
import { Order } from '@models/orders/entities/order.entity';
import { Gender } from '@common/enums/gender.enum';

@Entity({ name: 'aquatlons' })
export class Aquatlon extends BaseEntity {
  @IsInt()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Competition, (competition) => competition.aquatlons)
  @JoinColumn({ name: 'competition_id' })
  competition: Competition;

  @ManyToMany(() => Order, (order) => order.aquatlons)
  @JoinTable({
    name: 'order_aquatlons',
    joinColumn: {
      name: 'aquatlon_id',
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
  run_distance: number;

  @IsInt()
  @Column()
  water_distance: number;

  @IsEnum(Gender)
  @IsNotEmpty()
  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @IsDate()
  @Column({ type: 'date' })
  date: Date;

  constructor(aquatlon: Partial<Aquatlon>) {
    super();
    Object.assign(this, aquatlon);
  }
}