import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IsInt, IsString, IsNotEmpty } from 'class-validator';
import { Member } from '@models/members/entities/member.entity';

@Entity({ name: 'clubs' })
export class Club {
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
    Object.assign(this, club);
  }
}
