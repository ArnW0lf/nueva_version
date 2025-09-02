import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Docente } from './docente.entity';
import { PeriodoAcademico } from './periodo-academico.entity';
import { Horario } from './horario.entity';
import { Aula } from './aula.entity';

@Entity('grupo_materia')
export class GrupoMateria {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 10 })
    grupo: string;

    @Column({ type: 'int' })
    cupo: number;

    // Esta es una clave foránea a una tabla en otra base de datos.
    // Solo almacenamos el ID, sin una relación directa de TypeORM.
    @Column({ name: 'materia_id' })
    materiaId: number;

    @ManyToOne(() => Docente)
    @JoinColumn({ name: 'docente_id' })
    docente: Docente;

    @ManyToOne(() => PeriodoAcademico)
    @JoinColumn({ name: 'periodo_id' })
    periodo: PeriodoAcademico;

    @ManyToOne(() => Horario)
    @JoinColumn({ name: 'horario_id' })
    horario: Horario;

    @ManyToOne(() => Aula)
    @JoinColumn({ name: 'aula_id' })
    aula: Aula;
}