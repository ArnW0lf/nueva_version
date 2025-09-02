import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './filters/rpc-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  const configService = app.get(ConfigService);

  app.useGlobalFilters(new AllExceptionsFilter());


  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Sistema Académico - API Gateway')
    .setDescription('Punto de entrada para el sistema de microservicios académicos.')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Ingrese el token JWT',
      },
      'JWT-auth', // Este nombre es una clave para referenciarlo en los controladores
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(configService.get('API_GATEWAY_PORT'));
}
bootstrap();
