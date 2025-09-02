import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Nivel } from './nivel.entity';
import { PlanDeEstudio } from './plan_de_estudio.entity';
import { Prerequisito } from './prerequisitos.entity';

@Entity('materia')
export class Materia {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 20, unique: true, nullable: false })
    codigo: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    nombre: string;

    @Column({ type: 'int', nullable: false })
    creditos: number;

    @ManyToOne(() => PlanDeEstudio)
    @JoinColumn({ name: 'plan_estudio_id' })
    planEstudio: PlanDeEstudio;

  @ManyToOne(() => Nivel, (nivel) => nivel.materias)
    @JoinColumn({ name: 'nivel_id' })
    nivel: Nivel;

    @OneToMany(() => Prerequisito, (prereq) => prereq.materia)
    prerequisitos: Prerequisito[];

    @OneToMany(() => Prerequisito, (prereq) => prereq.materiaPrerequisito)
    esPrerrequisitoPara: Prerequisito[];
}