import { Controller } from '@nestjs/common';
import { SchedulingServiceService } from './scheduling-service.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreatePeriodoDto } from '@app/common';
@Controller()
export class SchedulingServiceController {
  constructor(private readonly schedulingService: SchedulingServiceService) { }
  
  @MessagePattern('create_periodo')
  createPeriodo(@Payload() createPeriodoDto: CreatePeriodoDto) {
    return this.schedulingService.createPeriodo(createPeriodoDto);
  }
}
