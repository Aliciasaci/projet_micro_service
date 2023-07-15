import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';
import { protobufPackage } from './auth/auth.pb';

export const grpcConfig = addReflectionToGrpcConfig({
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:5080',
    package: protobufPackage,
    protoPath: join(__dirname, '../../grpc-shared-protos/proto/auth.proto'),
  },
}) as GrpcOptions;