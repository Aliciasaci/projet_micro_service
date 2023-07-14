import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LivreModule } from './livre/livre.module';
import { RecetteModule } from './recette/recette.module';


@Module({
  imports: [RecetteModule, LivreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
