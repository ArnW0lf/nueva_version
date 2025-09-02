import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('docente')
export class Docente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 15, unique: true, nullable: false })
  ci: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nombre: string;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  email: string;
}