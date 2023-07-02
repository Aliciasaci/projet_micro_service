import { GrpcOptions, Transport } from '@nestjs/microservices';
import { RECETTE_V1ALPHA_PACKAGE_NAME } from './stubs/recette/v1alpha/recette';
import { join } from 'path';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';
export const grpcConfig = addReflectionToGrpcConfig({
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:6000',
    package: RECETTE_V1ALPHA_PACKAGE_NAME,
    protoPath: join(__dirname, 'proto/recette/v1alpha/recette.proto'),
  },
}) as GrpcOptions;