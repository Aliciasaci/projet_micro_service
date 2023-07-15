import { GrpcOptions, Transport } from '@nestjs/microservices';
import { RECETTE_PACKAGE_NAME } from './recette/recette.pb';
import { join } from 'path';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';

export const grpcConfig = addReflectionToGrpcConfig({
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0:5060',
    package: RECETTE_PACKAGE_NAME,
    protoPath: join(
      __dirname,
      '../../grpc-shared-protos/proto/recette.proto',
    ),
  },
}) as GrpcOptions;
