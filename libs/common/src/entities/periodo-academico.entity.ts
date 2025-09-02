import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('periodo_academico')
export class PeriodoAcademico {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100, unique: true })
    nombre: string;

  @Column({ type: 'date', name: 'fechainicio' })
    fechaInicio: Date;

  @Column({ type: 'date', name: 'fechafin' })
    fechaFin: Date;

    @Column({ type: 'boolean', default: false })
    activo: boolean;
}