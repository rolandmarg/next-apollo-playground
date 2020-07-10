import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CalendarEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  start: Date;

  @Column()
  end: Date;
}
