import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Materia } from './materia.entity';
import { PlanDeEstudio } from './plan_de_estudio.entity';

@Entity('nivel')
export class Nivel {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', nullable: false })
    numero: number;

    @Column({ type: 'varchar', length: 50, nullable: false })
    nombre: string;

  @ManyToOne(() => PlanDeEstudio, (plan) => plan.niveles)
    @JoinColumn({ name: 'plan_estudio_id' })
    planEstudio: PlanDeEstudio;

    @OneToMany(() => Materia, (materia) => materia.nivel)
    materias: Materia[];
}