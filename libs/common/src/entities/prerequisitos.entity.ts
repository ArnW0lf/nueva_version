import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Materia } from './materia.entity';

@Entity('prerequisitos')
export class Prerequisito {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50, nullable: false })
    tipo: string;

    @Column({ type: 'decimal', precision: 4, scale: 2, name: 'notamin' })
    notaMin: number;

  @ManyToOne(() => Materia, (materia) => materia.prerequisitos)
    @JoinColumn({ name: 'materia_id' })
    materia: Materia;

  @ManyToOne(() => Materia, (materia) => materia.esPrerrequisitoPara)
    @JoinColumn({ name: 'materia_prerequisito_id' })
    materiaPrerequisito: Materia;
}