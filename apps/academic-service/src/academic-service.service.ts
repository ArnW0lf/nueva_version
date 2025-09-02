import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Carrera, CreateCarreraDto } from '@app/common';
import { Repository } from 'typeorm';

@Injectable()
export class AcademicServiceService {
  constructor(
    @InjectRepository(Carrera)
    private readonly carreraRepository: Repository<Carrera>,
  ) { }

  async findAllCarreras(): Promise<Carrera[]> {
    return this.carreraRepository.find({
      where: { activa: true },
      order: { nombre: 'ASC' },
    });
  }

  async createCarrera(carreraDto: CreateCarreraDto): Promise<Carrera> {
    const carreraExistente = await this.carreraRepository.findOne({
      where: { nombre: carreraDto.nombre },
    });

    if (carreraExistente) {
      throw new ConflictException(
        `Ya existe una carrera con el nombre "${carreraDto.nombre}"`,
      );
    }

    const nuevaCarrera = this.carreraRepository.create(carreraDto);
    return this.carreraRepository.save(nuevaCarrera);
  }
}
