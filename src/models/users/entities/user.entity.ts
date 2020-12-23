import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import {
  IsInt,
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsDate
} from 'class-validator';

@Entity()
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

  @IsDate()
  @IsNotEmpty()
  @CreateDateColumn()
  birthdate: string;
}
