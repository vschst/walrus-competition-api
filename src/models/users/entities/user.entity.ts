import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'text' })
  email: string;

  @Column({ type: 'text' })
  password: string;
}
