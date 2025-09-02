import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('docente')
export class Docente {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 15, unique: true })
    ci: string;

    @Column({ type: 'varchar', length: 100 })
    nombre: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    email: string;
}