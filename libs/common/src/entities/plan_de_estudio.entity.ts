import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Carrera } from './carrera.entity';
import { Nivel } from './nivel.entity';

@Entity('plan_de_estudio')
export class PlanDeEstudio {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100, nullable: false })
    nombre: string;

  @ManyToOne(() => Carrera)
    @JoinColumn({ name: 'carrera_id' })
    carrera: Carrera;

    @OneToMany(() => Nivel, (nivel) => nivel.planEstudio)
    niveles: Nivel[];
}