import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Carrera } from './carrera.entity';

@Entity('estudiante')
export class Estudiante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20, unique: true, nullable: false })
  registro: string;

  @Column({ type: 'varchar', length: 15, unique: true, nullable: false })
  ci: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nombre: string;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 20, default: 'ACTIVO' })
  estado: string;

  @Column({ type: 'varchar', length: 255, nullable: false, select: false })
  password: string;

  @Column({ name: 'carrera_id', nullable: true })
  carreraId: number;

  @ManyToOne(() => Carrera, { nullable: true })
  @JoinColumn({ name: 'carrera_id' })
  carrera: Carrera;
}
