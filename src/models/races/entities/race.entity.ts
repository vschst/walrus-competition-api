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
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
  Max,
  IsDate,
} from 'class-validator';
import { Competition } from '@models/competitions/entities/competition.entity';
import { SwimmingStyles } from '@common/enums/swimming-styles.enum';
import { Gender } from '@common/enums/gender.enum';
import { Order } from '@models/orders/entities/order.entity';

@Entity({ name: 'races' })
export class Race extends BaseEntity {
  @IsInt()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Competition, (competition) => competition.races)
  @JoinColumn({ name: 'competition_id' })
  competition: Competition;

  @ManyToMany(() => Order, (order) => order.races)
  @JoinTable({
    name: 'order_races',
    joinColumn: {
      name: 'race_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'order_id',
      referencedColumnName: 'id',
    },
  })
  order: Order[];

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

  @IsEnum(Gender)
  @IsNotEmpty()
  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @IsInt()
  @Min(0)
  @Max(99)
  @Column()
  min_age: number;

  @IsInt()
  @Min(1)
  @Max(100)
  @Column()
  max_age: number;

  @IsDate()
  @Column({ type: 'date' })
  date: Date;

  constructor(race: Partial<Race>) {
    super();
    Object.assign(this, race);
  }
}
