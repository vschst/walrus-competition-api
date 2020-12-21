import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Club {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  location: string;
}
