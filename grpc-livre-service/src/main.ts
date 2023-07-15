import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { grpcConfig } from './grpc.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cs = app.get(ConfigService);

  app.connectMicroservice(grpcConfig);
  app.enableShutdownHooks();

  await app.startAllMicroservices();

  const healthCheckPort = cs.get('HEALTH_PORT');

  await app.listen(healthCheckPort);
}

bootstrap();
