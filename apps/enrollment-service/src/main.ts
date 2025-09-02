import { NestFactory } from '@nestjs/core';
import { EnrollmentServiceModule } from './enrollment-service.module';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.create(EnrollmentServiceModule);
  const configService = app.get(ConfigService);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: configService.get('ENROLLMENT_SERVICE_PORT'),
    },
  });

  await app.startAllMicroservices();
}
bootstrap();
