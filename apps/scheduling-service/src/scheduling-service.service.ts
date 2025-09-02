import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePeriodoDto, PeriodoAcademico } from '@app/common';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';


@Injectable()
export class SchedulingServiceService {
constructor(
    @InjectRepository(PeriodoAcademico)
    private readonly periodoRepository: Repository<PeriodoAcademico>,
  ) {}

  async createPeriodo(createPeriodoDto: CreatePeriodoDto) {
    const existingPeriodo = await this.periodoRepository.findOneBy({ nombre: createPeriodoDto.nombre });
    if (existingPeriodo) {
      throw new RpcException({
        message: `El periodo académico con el nombre "${createPeriodoDto.nombre}" ya existe.`,
        status: HttpStatus.CONFLICT,
      });
    }
    const nuevoPeriodo = this.periodoRepository.create(createPeriodoDto);
    return this.periodoRepository.save(nuevoPeriodo);

  }
}
