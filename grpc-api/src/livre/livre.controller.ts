import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  AddLivreRequest,
  LivreServiceClient,
  LIVRE_SERVICE_NAME,
  AddLivreResponse,
} from './livre.pb';
import { Request } from 'express';

@Controller('livre')
export class LivreController implements OnModuleInit {
  private svc: LivreServiceClient;

  @Inject(LIVRE_SERVICE_NAME)
  private client: ClientGrpc;

  public onModuleInit() {
    this.svc = this.client.getService<LivreServiceClient>(LIVRE_SERVICE_NAME);
  }
}
