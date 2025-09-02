import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('aula')
export class Aula {
    @PrimaryGeneratedColumn()
    id: number;

  @Column({ type: 'varchar', length: 50, unique: true }) // e.g., "Aula 101", "Laboratorio de Cómputo 3"
    nombre: string; // e.g., "Aula 101", "Laboratorio de Cómputo 3"

    @Column({ type: 'int' })
    capacidad: number;
}