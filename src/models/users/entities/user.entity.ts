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
import * as bcrypt from 'bcrypt';

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

  @Exclude({ toPlainOnly: true })
  @Column({ select: false })
  salt: string;

  @IsString()
  @IsNotEmpty()
  @Column()
  name: string;

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.salt);
  }

  async validatePassword(password: string): Promise<boolean> {
    const hash = await this.hashPassword(password);

    return hash === this.password;
  }
}
