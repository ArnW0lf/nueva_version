import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('detalle_inscripcion')
export class DetalleInscripcion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'inscripcion_id' })
    inscripcionId: number;

  @Column({ type: 'varchar', length: 20, unique: true })
  codigo: string;

  @Column({ type: 'varchar', length: 20, default: 'INSCRITO' })
  estado: string;

  @Column({ type: 'decimal', precision: 4, scale: 2, name: 'nota_final', nullable: true })
  notaFinal: number;

    @Column({ name: 'grupo_materia_id' })
    grupoMateriaId: number;
}