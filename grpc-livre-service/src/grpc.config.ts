import { GrpcOptions, Transport } from '@nestjs/microservices';
import { LIVRE_PACKAGE_NAME } from './livre/proto/livre.pb';
import { join } from 'path';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';

export const grpcConfig = addReflectionToGrpcConfig({
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:5070',
    package: LIVRE_PACKAGE_NAME,
    protoPath: join(__dirname, '../../grpc-shared-protos/proto/livre.proto'),
  },
}) as GrpcOptions;
