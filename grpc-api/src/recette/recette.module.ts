import { Module } from '@nestjs/common';
import { Client, ClientsModule, Transport } from '@nestjs/microservices';
import { RECETTE_PACKAGE_NAME, RECETTE_SERVICE_NAME } from './recette.pb';
import { RecetteController } from './recette.controller';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: RECETTE_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50053',
          package: RECETTE_PACKAGE_NAME,
          protoPath: join(
            __dirname,
            '../../../grpc-shared-protos/proto/recette.proto',
          ),
        },
      },
    ]),
  ],
  controllers: [RecetteController],
})
export class RecetteModule {}
