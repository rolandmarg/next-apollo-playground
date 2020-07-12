import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class CalendarEventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  start: Date;

  @Column()
  end: Date;
}
