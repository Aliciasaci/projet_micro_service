import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecetteModule } from './recette/recette.module';
import { LivreModule } from './livre/livre.module';

@Module({
  imports: [RecetteModule, LivreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
