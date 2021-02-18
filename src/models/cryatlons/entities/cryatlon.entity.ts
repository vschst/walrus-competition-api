import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  Column,
  JoinColumn,
} from 'typeorm';
import { IsDate, IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Competition } from '@models/competitions/entities/competition.entity';
import { Order } from '@models/orders/entities/order.entity';
import { Gender } from '@common/enums/gender.enum';

@Entity({ name: 'cryatlons' })
export class Cryatlon extends BaseEntity {
  @IsInt()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Competition, (competition) => competition.cryatlons)
  @JoinColumn({ name: 'competition_id' })
  competition: Competition;

  @OneToMany(() => Order, (order) => order.cryatlon)
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
  ski_distance: number;

  @IsInt()
  @Column()
  water_distance: number;

  @IsInt()
  @Column()
  barefoot_distance: number;

  @IsEnum(Gender)
  @IsNotEmpty()
  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @IsDate()
  @Column({ type: 'date' })
  date: Date;

  constructor(cryatlon: Partial<Cryatlon>) {
    super();
    Object.assign(this, cryatlon);
  }
}
