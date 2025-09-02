import {
    Body,
    Controller,
    Inject,
    Post,
    UseGuards,
    ValidationPipe,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './guards/auth.guard';
import { CreatePeriodoDto } from '@app/common';

@ApiTags('Scheduling')
@Controller('scheduling')
export class SchedulingController {
    constructor(
        @Inject('SCHEDULING_SERVICE')
        private readonly schedulingClient: ClientProxy,
    ) { }

    @Post('periodos')
    @UseGuards(AuthGuard)
    @ApiBearerAuth('JWT-auth')
    @ApiCreatedResponse({ description: 'El periodo ha sido creado exitosamente.' })
    createPeriodo(@Body(new ValidationPipe()) createPeriodoDto: CreatePeriodoDto) {
        return this.schedulingClient.send('create_periodo', createPeriodoDto);
    }
}