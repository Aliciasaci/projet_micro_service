import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import {
  AddRecetteRequest,
  AddRecetteResponse,
  DeleteRecetteRequest,
  DeleteRecetteResponse,
  GetRecetteRequest,
  GetRecetteResponse,
  Recette,
  RecetteServiceController,
  UpdateRecetteRequest,
  UpdateRecetteResponse,
  RecetteServiceControllerMethods,
} from './stubs/recette/v1alpha/recette';
import { GrpcMethod } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';

@Controller()
@RecetteServiceControllerMethods()
export class AppController implements RecetteServiceController {
  constructor(private readonly appService: AppService) {}


  
  async get(request: GetRecetteRequest, metadata?: Metadata): Promise<GetRecetteResponse> {
    let recette: Recette;
    let recettes: Recette[] = [];

    if (request.id) {
      recette = await this.appService.findById(request.id);
      return { recettes: [recette] };
    } else if (request.nom) {
      recette = await this.appService.findByName(request.nom);
      return { recettes: [recette] };
    } else {
      recettes = await this.appService.findAll();
      return { recettes };
    }
  }

  async update(
    request: UpdateRecetteRequest,
    metadata?: Metadata,
  ): Promise<UpdateRecetteResponse> {
    const updatedRecette = await this.appService.update(request.id, request.data);
    return { recette: updatedRecette };
  }

  async delete(
    request: DeleteRecetteRequest,
    metadata?: Metadata,
  ): Promise<DeleteRecetteResponse> {
    const deletedRecette = await this.appService.delete(request.id);
    return { message: `Recette with ID ${deletedRecette.id} has been deleted` };
  }

  async add(request: AddRecetteRequest): Promise<AddRecetteResponse> {
    const newRecette = await this.appService.create(request);
    return { recette: newRecette };
  }
}
