import {
  Controller,
  Inject,
  UseGuards,
  OnModuleInit,
  Post,
  Req,
  Get,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import {
  AddLivreRequest,
  LivreServiceClient,
  LIVRE_SERVICE_NAME,
  AddLivreResponse,
  UpdateLivreRequest,
  UpdateLivreResponse,
  DeleteLivreRequest,
  DeleteLivreResponse,
  ListLivreRequest,
  ListLivreResponse,
  GetLivreRequest,
  GetLivreResponse,
  AddRecetteToLivreRequest,
  AddRecetteToLivreResponse,
} from './livre.pb';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

@Controller('livre')
export class LivreController implements OnModuleInit {
  private svc: LivreServiceClient;

  @Inject(LIVRE_SERVICE_NAME)
  private client: ClientGrpc;

  public onModuleInit() {
    this.svc = this.client.getService<LivreServiceClient>(LIVRE_SERVICE_NAME);
  }

  @Post()
  @UseGuards(AuthGuard)
  private async add(
    @Req() req: Request,
  ): Promise<Observable<AddLivreResponse>> {
    const body: AddLivreRequest = req.body;

    body.user_id = <number>req.user;

    return this.svc.add(body);
  }

  @Get()
  private async list(): Promise<Observable<ListLivreResponse>> {
    const body: ListLivreRequest = {};

    return this.svc.list(body);
  }

  @Get(':id')
  private async get(
    @Param('id') id: number,
    @Body() titre: string,
  ): Promise<Observable<GetLivreResponse>> {
    const body: GetLivreRequest = { id, titre };

    return this.svc.get(body);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  private async update(
    @Param('id') id: number,
    @Body() livre: Partial<AddLivreRequest>,
  ): Promise<Observable<UpdateLivreResponse>> {
    const body: UpdateLivreRequest = {
      id,
      data: livre,
    };

    return this.svc.update(body);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  private async delete(
    @Param('id') id: number,
  ): Promise<Observable<DeleteLivreResponse>> {
    const body: DeleteLivreRequest = { id };

    return this.svc.delete(body);
  }

  @Post(':id/recette')
  @UseGuards(AuthGuard)
  private async addRecetteToLivre(
    @Param('id') id: number,
    @Body() recette: AddRecetteToLivreRequest,
  ): Promise<Observable<AddRecetteToLivreResponse>> {
    const body: AddRecetteToLivreRequest = { id, ...recette };

    return this.svc.addRecetteToLivre(body);
  }
}
