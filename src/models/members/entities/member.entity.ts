import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import {
  IsInt,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDate,
  IsEnum,
  IsEmail,
  IsPhoneNumber,
} from 'class-validator';
import { Gender } from '@common/enums/gender.enum';
import { Club } from '@models/clubs/entities/club.entity';

@Entity({ name: 'members' })
export class Member extends BaseEntity {
  @IsInt()
  @PrimaryGeneratedColumn()
  id: number;

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

  @ManyToOne(() => Club, (club) => club.members)
  @JoinColumn({ name: 'club_id' })
  club: Club;

  constructor(member: Partial<Member>) {
    super();
    Object.assign(this, member);
  }
}
