import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsInt, IsString, IsNotEmpty } from 'class-validator';
import { Member } from '@models/members/entities/member.entity';
import { BaseEntity } from 'typeorm';

@Entity({ name: 'clubs' })
export class Club extends BaseEntity {
  @IsInt()
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsNotEmpty()
  @Column()
  name: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  location: string;

  @OneToMany(() => Member, (member) => member.club)
  members: Member[];

  constructor(club: Partial<Club>) {
    super();
    Object.assign(this, club);
  }
}
