import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('periodoacademico')
export class PeriodoAcademico {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 10 })
    gestion: string;

    @Column({ type: 'date', name: 'fechainicio' })
    fechaInicio: Date;

    @Column({ type: 'date', name: 'fechafin' })
    fechaFin: Date;
}