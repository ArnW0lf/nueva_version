import { NestFactory } from '@nestjs/core';
import { AcademicServiceModule } from './academic-service.module';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AcademicServiceModule);
  const configService = app.get(ConfigService);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: configService.get('ACADEMIC_SERVICE_PORT'),
    },
  });

  await app.startAllMicroservices();
}
bootstrap();
