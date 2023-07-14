import {
  Controller,
  Inject,
  Post,
  OnModuleInit,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  AddRecetteResponse,
  RecetteServiceClient,
  RECETTE_SERVICE_NAME,
  AddRecetteRequest,
} from './recette.pb';
import { Request } from 'express';

@Controller('recette')
export class RecetteController implements OnModuleInit {
  private svc: RecetteServiceClient;

  @Inject(RECETTE_SERVICE_NAME)
  private client: ClientGrpc;

  public onModuleInit() {
    this.svc =
      this.client.getService<RecetteServiceClient>(RECETTE_SERVICE_NAME);
  }
}
