import { Controller } from '@nestjs/common';
import { AuthServiceService } from './auth-service.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RegisterUserDto, LoginUserDto } from '@app/common';

@Controller()
export class AuthServiceController {
  constructor(private readonly authService: AuthServiceService) { }

  @MessagePattern('register_user')
  handleRegisterUser(@Payload() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @MessagePattern('login_user')
  handleLoginUser(@Payload() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @MessagePattern('validate_user')
  handleValidateUser(@Payload() data: { jwt: string }) {
    return this.authService.validateUser(data.jwt);
  }
}
