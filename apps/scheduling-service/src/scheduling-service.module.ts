import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Aula,
  Docente,
  GrupoMateria,
  Horario,
  PeriodoAcademico,
} from '@app/common';
import { SchedulingServiceController } from './scheduling-service.controller';
import { SchedulingServiceService } from './scheduling-service.service';

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
        host: configService.get('SCHEDULING_DB_HOST'),
        port: configService.get('SCHEDULING_DB_PORT'),
        username: configService.get('SCHEDULING_DB_USERNAME'),
        password: configService.get<string>('SCHEDULING_DB_PASSWORD'),
        database: configService.get('SCHEDULING_DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      Aula,
      Docente,
      PeriodoAcademico,
      Horario,
      GrupoMateria,
    ]),
  ],
  controllers: [SchedulingServiceController],
  providers: [SchedulingServiceService],
})
export class SchedulingServiceModule {}
