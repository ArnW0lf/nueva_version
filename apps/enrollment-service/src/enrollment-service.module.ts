import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DetalleInscripcion,
  HistorialAcademico,
  Inscripcion,
} from '@app/common';
import { EnrollmentServiceController } from './enrollment-service.controller';
import { EnrollmentServiceService } from './enrollment-service.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('ENROLLMENT_DB_HOST'),
        port: configService.get('ENROLLMENT_DB_PORT'),
        username: configService.get('ENROLLMENT_DB_USERNAME'),
        password: configService.get<string>('ENROLLMENT_DB_PASSWORD'),
        database: configService.get('ENROLLMENT_DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      Inscripcion,
      DetalleInscripcion,
      HistorialAcademico,
    ]),
  ],
  controllers: [EnrollmentServiceController],
  providers: [EnrollmentServiceService],
})
export class EnrollmentServiceModule { }
