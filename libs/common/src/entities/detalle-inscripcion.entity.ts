import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Inscripcion } from './inscripcion.entity';
import { HistorialAcademico } from './historial-academico.entity';

@Entity('detalle_inscripcion')
export class DetalleInscripcion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 20, unique: true })
    codigo: string;

    @Column({ type: 'varchar', length: 20, default: 'INSCRITO' })
    estado: string;

    @Column({ type: 'decimal', precision: 4, scale: 2, name: 'nota_final', nullable: true })
    notaFinal: number;

    @ManyToOne(() => Inscripcion, (inscripcion) => inscripcion.detalles)
    @JoinColumn({ name: 'inscripcion_id' })
    inscripcion: Inscripcion;

    // Clave foránea a 'grupo_materia' en scheduling_db
    @Column({ name: 'grupo_materia_id' })
    grupoMateriaId: number;

    @OneToOne(() => HistorialAcademico, (historial) => historial.detalleInscripcion)
    historial: HistorialAcademico;
}