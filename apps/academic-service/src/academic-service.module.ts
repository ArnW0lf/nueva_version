import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Carrera,
  Materia,
  Nivel,
  PlanDeEstudio,
  Prerequisito,
} from '@app/common';
import { AcademicServiceController } from './academic-service.controller';
import { AcademicServiceService } from './academic-service.service';

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
        host: configService.get<string>('ACADEMIC_DB_HOST'),
        port: configService.get<number>('ACADEMIC_DB_PORT'),
        username: configService.get<string>('ACADEMIC_DB_USERNAME'),
        password: configService.get<string>('ACADEMIC_DB_PASSWORD'),
        database: configService.get<string>('ACADEMIC_DB_NAME'),
        autoLoadEntities: true,
        synchronize: true, // ¡Solo para desarrollo!
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      Carrera,
      Materia,
      Nivel,
      PlanDeEstudio,
      Prerequisito,
    ]),
  ],
  controllers: [AcademicServiceController],
  providers: [AcademicServiceService],
})
export class AcademicServiceModule {}