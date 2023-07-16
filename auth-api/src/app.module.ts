import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GrpcReflectionModule } from 'nestjs-grpc-reflection';
import { grpcConfig } from './grpc.config';
import { PrismaService } from './prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtService } from './auth/service/jwt.service';
import { JwtStrategy } from './auth/strategy/jwt.strategy';
@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      isGlobal: true,
    }),
    GrpcReflectionModule.register(grpcConfig),
    JwtModule.register({
      secret: 'dev',
      signOptions: { expiresIn: '365d' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, JwtService, JwtStrategy],
})
export class AppModule {}