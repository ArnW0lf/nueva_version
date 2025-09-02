import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
} from 'typeorm';

@Entity('inscripcion')
export class Inscripcion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'estudiante_id' })
    estudianteId: number;

  @Column({ name: 'periodo_id' })
  periodoId: number;

    @CreateDateColumn({ name: 'fecha_inscripcion' })
    fechaInscripcion: Date;

    @Column({ type: 'varchar', length: 20, default: 'PENDIENTE' }) // PENDIENTE, CONFIRMADA, ANULADA
    estado: string;
}