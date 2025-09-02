import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  @Column({ name: 'detalle_inscripcion_id' })
  detalleInscripcionId: number;
}