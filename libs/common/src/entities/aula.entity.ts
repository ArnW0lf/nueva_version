import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('aula')
export class Aula {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 20, unique: true })
    codigo: string;

    @Column({ type: 'int' })
    capacidad: number;

    @Column({ type: 'varchar', length: 100 })
    ubicacion: string;
}