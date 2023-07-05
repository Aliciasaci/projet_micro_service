import { GrpcOptions, Transport } from '@nestjs/microservices';
import { LIVRE_V1ALPHA_PACKAGE_NAME } from './stubs/livre';
import { join } from 'path';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';

export const grpcConfig = addReflectionToGrpcConfig({
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:5000',
    package: LIVRE_V1ALPHA_PACKAGE_NAME,
    protoPath: join(__dirname, '../src/proto/livre/v1alpha/livre.proto'),
  },
}) as GrpcOptions;