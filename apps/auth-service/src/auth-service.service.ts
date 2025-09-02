import {
  Injectable,
  Inject,
  HttpStatus,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante, RegisterUserDto, LoginUserDto } from '@app/common';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthServiceService {
  constructor(
    @InjectRepository(Estudiante)
    private readonly studentRepository: Repository<Estudiante>,
    @Inject('ACADEMIC_SERVICE')
    private readonly academicClient: ClientProxy,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    const { email, registro, carreraId } = registerUserDto;

    const existingStudent = await this.studentRepository.findOne({
      where: [{ email }, { registro }],
    });

    if (existingStudent) {
      throw new RpcException({
        message: 'El email o número de registro ya existe.',
        status: HttpStatus.CONFLICT,
      });
    }

    // Se añade un .catch para manejar el caso en que el academic-service no responda
    const carrera = await firstValueFrom(
      this.academicClient.send('get_carrera_by_id', { id: carreraId }),
    ).catch(() => null);

    if (!carrera) {
      throw new RpcException({
        message: `La carrera con ID ${carreraId} no fue encontrada.`,
        status: HttpStatus.NOT_FOUND,
      });
    }

    const newStudent = this.studentRepository.create(registerUserDto);
    const savedStudent = await this.studentRepository.save(newStudent);

    delete savedStudent.password;
    return savedStudent;
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const student = await this.studentRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password', 'activo'], // Se añade 'activo'
    });

    if (!student || !(await student.validatePassword(password))) {
      throw new RpcException({
        message: 'Credenciales inválidas.',
        status: HttpStatus.UNAUTHORIZED,
      });
    }

    if (!student.activo) {
      throw new RpcException({
        message: 'La cuenta del estudiante está inactiva.',
        status: HttpStatus.FORBIDDEN,
      });
    }

    const payload = { sub: student.id, email: student.email, role: 'student' };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }

  async validateUser(jwt: string) {
    try {
      return this.jwtService.verify(jwt);
    } catch (error) {
      throw new RpcException({
        message: 'Token inválido o expirado.',
        status: HttpStatus.UNAUTHORIZED,
      });
    }
  }
}