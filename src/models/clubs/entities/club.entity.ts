import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsInt, IsString, IsNotEmpty } from 'class-validator';

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

  constructor(club: Partial<Club>) {
    Object.assign(this, club);
  }
}
