import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('carrera')
export class Carrera {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nombre: string;

  @Column({ type: 'boolean', default: true })
  activa: boolean;
}
