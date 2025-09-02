import { Body, Controller, Get, Inject, Post, ValidationPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateCarreraDto } from '@app/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Academic')
@Controller('academic')
export class AcademicController {
    constructor(
        @Inject('ACADEMIC_SERVICE') private readonly academicClient: ClientProxy,
    ) { }

    @Get('carreras')
  findAllCarreras() {
        return this.academicClient.send('get_carreras', {});
    }

  @Post('carreras')
  @ApiCreatedResponse({ description: 'La carrera ha sido creada exitosamente.' })
  createCarrera(
    @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    createCarreraDto: CreateCarreraDto,
  ) {
    return this.academicClient.send('create_carrera', createCarreraDto);
  }
}