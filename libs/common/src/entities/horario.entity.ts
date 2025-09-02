import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('horario')
export class Horario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 20 }) // Lunes, Martes, etc.
    dia: string;

  @Column({ type: 'time', name: 'horainicio' })
    horaInicio: string;

  @Column({ type: 'time', name: 'horafin' })
    horaFin: string;
}