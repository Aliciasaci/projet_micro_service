import {
  Controller,
  Inject,
  Post,
  OnModuleInit,
  UseGuards,
  Req,
  Get,
  Body,
  Put,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  AddRecetteResponse,
  RecetteServiceClient,
  RECETTE_SERVICE_NAME,
  AddRecetteRequest,
  UpdateRecetteRequest,
  UpdateRecetteResponse,
  DeleteRecetteRequest,
  DeleteRecetteResponse,
  ListRecettesRequest,
  ListRecettesResponse,
  GetRecetteRequest,
  GetRecetteResponse,
  Recette,
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

  @Post()
  private async add(@Body() body: AddRecetteRequest): Promise<Observable<AddRecetteResponse>> {
    return this.svc.add(body);
  }

  @Patch(':id')
  private async update(@Param('id') id: number, @Body() recette: Partial<Recette>): Promise<Observable<UpdateRecetteResponse>> {
    const body: UpdateRecetteRequest = { id, data: recette };

    return this.svc.update(body);
  }

  @Delete(':id')
  private async delete(@Param('id') id: number): Promise<Observable<DeleteRecetteResponse>> {
    const body: DeleteRecetteRequest = { id };

    return this.svc.delete(body);
  }

  @Get()
  private async list(): Promise<Observable<ListRecettesResponse>> {
    const body: ListRecettesRequest = {};
    
    return this.svc.list(body);
  }

  @Get(':id')
  private async get(@Param('id') id: number, @Body() nom: string): Promise<Observable<GetRecetteResponse>> {
    const body: GetRecetteRequest = { id, nom };

    return this.svc.get(body);
  }

}
