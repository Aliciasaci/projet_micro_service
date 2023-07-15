import { Module } from '@nestjs/common';
import { RecetteController } from './recette.controller';
import { RecetteService } from './recette.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [RecetteController],
  providers: [RecetteService, PrismaService],
  exports: [RecetteService, PrismaService],
})
export class RecetteModule {}
