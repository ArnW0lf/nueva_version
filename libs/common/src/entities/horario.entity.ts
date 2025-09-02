import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('horario')
export class Horario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 15 })
    dia: string;

    @Column({ type: 'time', name: 'horainicio' })
    horaInicio: string;

    @Column({ type: 'time', name: 'horafin' })
    horaFin: string;
}