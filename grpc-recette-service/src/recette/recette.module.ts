import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RecetteController } from './recette.controller';
import { RecetteService } from './recette.service';
import { GrpcReflectionModule } from 'nestjs-grpc-reflection';
import { grpcConfig } from '../grpc.config';
import { PrismaService } from '../prisma.service';
@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      isGlobal: true,
    }),
    GrpcReflectionModule.register(grpcConfig)],
  controllers: [RecetteController],
  providers: [RecetteService, PrismaService],
})
export class RecetteModule {}