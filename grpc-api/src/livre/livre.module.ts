import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { LIVRE_SERVICE_NAME, LIVRE_PACKAGE_NAME } from './livre.pb';
import { LivreController } from './livre.controller';
import { join } from 'path';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: LIVRE_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50052',
          package: LIVRE_PACKAGE_NAME,
          protoPath: join(__dirname, '../../../grpc-shared-protos/proto/livre.proto'),
        },
      },
    ]),
    AuthModule,
  ],
  controllers: [LivreController],
})
export class LivreModule {}
