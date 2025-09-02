import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { DetalleInscripcion } from './detalle-inscripcion.entity';

@Entity('historial_academico')
export class HistorialAcademico {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int', default: 1 })
    intento: number;

    @Column({ type: 'decimal', precision: 4, scale: 2, name: 'ultimanota', nullable: true })
    ultimaNota: number;

    @Column({ default: false })
    aprobado: boolean;

    @Column({ type: 'date', name: 'fechaaprobacion', nullable: true })
    fechaAprobacion: Date;

    @OneToOne(() => DetalleInscripcion, (detalle) => detalle.historial)
    @JoinColumn({ name: 'detalle_inscripcion_id' })
    detalleInscripcion: DetalleInscripcion;
}