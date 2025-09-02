import { Controller } from '@nestjs/common';
import { AcademicServiceService } from './academic-service.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateCarreraDto } from '@app/common';

@Controller()
export class AcademicServiceController {
  constructor(private readonly academicService: AcademicServiceService) { }

  @MessagePattern('get_carreras')
  findAllCarreras() {
    return this.academicService.findAllCarreras();
  }

  @MessagePattern('create_carrera')
  createCarrera(@Payload() createCarreraDto: CreateCarreraDto) {
    return this.academicService.createCarrera(createCarreraDto);
  }
}