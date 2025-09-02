import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('grupo_materia')
export class GrupoMateria {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 20 })
    nombre: string; // e.g., "Grupo A", "Grupo B"

    @Column({ type: 'int' })
    cupos: number;

    @Column({ name: 'materia_id' })
    materiaId: number;

    @Column({ name: 'docente_id' })
    docenteId: number;

    @Column({ name: 'periodo_id' })
    periodoId: number;

  @Column({ name: 'horario_id' })
  horarioId: number;

  @Column({ name: 'aula_id' })
  aulaId: number;
}