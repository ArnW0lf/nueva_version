import { Controller, Get } from '@nestjs/common';
import { EnrollmentServiceService } from './enrollment-service.service';

@Controller()
export class EnrollmentServiceController {
  constructor(private readonly enrollmentServiceService: EnrollmentServiceService) {}

  @Get()
  getHello(): string {
    return this.enrollmentServiceService.getHello();
  }
}
