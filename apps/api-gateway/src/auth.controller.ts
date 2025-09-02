import {
    Body,
    Controller,
  Get,
    Inject,
    Post,
  Req,
  UseGuards,
    ValidationPipe,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginUserDto, RegisterUserDto } from '@app/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from './guards/auth.guard';
import { Request } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(@Inject('AUTH_SERVICE') private readonly authClient: ClientProxy) { }

    @Post('register')
    @ApiCreatedResponse({ description: 'El estudiante ha sido registrado exitosamente.' })
    register(
        @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
        registerUserDto: RegisterUserDto,
    ) {
        return this.authClient.send('register_user', registerUserDto);
    }

    @Post('login')
    @ApiOkResponse({ description: 'Inicio de sesión exitoso.' })
    login(
        @Body(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
        loginUserDto: LoginUserDto,
    ) {
        return this.authClient.send('login_user', loginUserDto);
    }

  @Get('profile')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth') // Le dice a Swagger que este endpoint usa la seguridad JWT
  @ApiOkResponse({ description: 'Perfil del usuario autenticado.' })
  getProfile(@Req() req: Request) {
    return req['user'];
  }
}