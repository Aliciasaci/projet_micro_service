import { Module } from '@nestjs/common';
import { LivreController } from './livre.controller';
import { LivreService } from './livre.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [LivreController],
  providers: [LivreService, PrismaService],
  exports: [LivreService, PrismaService],
})
export class LivreModule {}
