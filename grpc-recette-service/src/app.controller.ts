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
  ListRecettesRequest,
  ListRecettesResponse,
  RecetteServiceControllerMethods,
<<<<<<< HEAD:recette-api/src/app.controller.ts
} from './stubs/recette/v1alpha/recette';
=======
} from './recette/recette.pb';
>>>>>>> final-api:grpc-recette-service/src/app.controller.ts
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { Metadata } from '@grpc/grpc-js';

@Controller()
@RecetteServiceControllerMethods()
export class AppController implements RecetteServiceController {
  constructor(private readonly appService: AppService) {}

  /**
   * @param request
   * @param metadata
   * @returns
   */
  async get(request: GetRecetteRequest, metadata?: Metadata): Promise<GetRecetteResponse> {
    let recette: Recette;

    if (request.id) {
      recette = await this.appService.findById(request.id);
      return { recette };
    } else if (request.nom) {
      recette = await this.appService.findByName(request.nom);
      return { recette };
    }
  }

  async list(request: ListRecettesRequest): Promise<ListRecettesResponse> {
    try {
      const recettes = await this.appService.findAll();
      const recettesList = recettes.map(this.appService.toRecettePb);
      return { recettes: recettesList };
    } catch (error) {
      throw new RpcException(error);
    }
  }

  /**
   * @param request
   * @param metadata
   * @returns
   */
  async update(
    request: UpdateRecetteRequest,
    metadata?: Metadata,
  ): Promise<UpdateRecetteResponse> {
    const updatedRecette = await this.appService.update(request.id, request.data);
    return { recette: updatedRecette };
  }

  /**
   * @param request
   * @param metadata
   * @returns
   */
  async delete(
    request: DeleteRecetteRequest,
    metadata?: Metadata,
  ): Promise<DeleteRecetteResponse> {
    const deletedRecette = await this.appService.delete(request.id);
    return { message: `Recette with ID ${deletedRecette.id} has been deleted` };
  }

  /**
   * @param request
   * @returns
   */
  async add(request: AddRecetteRequest): Promise<AddRecetteResponse> {
    const newRecette = await this.appService.create(request);
    return { recette: newRecette };
  }
}