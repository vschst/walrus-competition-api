import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Exclude } from 'class-transformer';
import {
  IsInt,
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
} from 'class-validator';

@Entity({ name: 'users' })
export class User {
  @IsInt()
  @PrimaryGeneratedColumn()
  id: number;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  @Column()
  email: string;

  @MinLength(8)
  @MaxLength(10)
  @Exclude({ toPlainOnly: true })
  @Column({ select: false })
  password: string;
}
