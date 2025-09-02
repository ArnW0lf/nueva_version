import { NestFactory } from '@nestjs/core';
import { SchedulingServiceModule } from './scheduling-service.module';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(SchedulingServiceModule);
  const configService = app.get(ConfigService);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: configService.get('SCHEDULING_SERVICE_PORT'),
    },
  });

  await app.startAllMicroservices();
}
bootstrap();
