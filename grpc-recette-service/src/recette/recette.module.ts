import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecetteController } from './recette.controller';
import { RecetteService } from './recette.service';
import { Recette } from './entity/recette.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recette])],
  controllers: [RecetteController],
  providers: [RecetteService],
})
export class RecetteModule {}
