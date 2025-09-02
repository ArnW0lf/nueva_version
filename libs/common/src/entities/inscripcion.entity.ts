import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DetalleInscripcion } from './detalle-inscripcion.entity';

@Entity('inscripcion')
export class Inscripcion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'date' })
    fecha: Date;

    @Column({ type: 'varchar', length: 20, default: 'PENDIENTE' })
    estado: string;

    // Clave foránea a 'estudiante' en auth_db
    @Column({ name: 'estudiante_id' })
    estudianteId: number;

    // Clave foránea a 'PeriodoAcademico' en scheduling_db
    @Column({ name: 'periodo_id' })
    periodoId: number;

    @OneToMany(
        () => DetalleInscripcion,
        (detalle) => detalle.inscripcion,
    )
    detalles: DetalleInscripcion[];
}