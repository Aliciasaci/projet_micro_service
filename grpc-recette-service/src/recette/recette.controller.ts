import { Controller, Inject } from '@nestjs/common';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { RecetteService } from './recette.service';
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
} from './recette.pb';
import { Metadata } from '@grpc/grpc-js';

@Controller('recette')
export class RecetteController implements RecetteServiceController {
  constructor(private readonly recetteService: RecetteService) {}

  /**
   * @param request
   * @param metadata
   * @returns
   */
  async get(
    request: GetRecetteRequest,
    metadata?: Metadata,
  ): Promise<GetRecetteResponse> {
    let recette: Recette;

    if (request.id) {
      recette = await this.recetteService.findById(request.id);
      return { recette };
    } else if (request.nom) {
      recette = await this.recetteService.findByName(request.nom);
      return { recette };
    }
  }

  async list(request: ListRecettesRequest): Promise<ListRecettesResponse> {
    try {
      const recettes = await this.recetteService.findAll();
      const recettesList = recettes.map(this.recetteService.toRecettePb);
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
    const updatedRecette = await this.recetteService.update(
      request.id,
      request.data,
    );
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
    const deletedRecette = await this.recetteService.delete(request.id);
    return { message: `Recette with ID ${deletedRecette.id} has been deleted` };
  }

  /**
   * @param request
   * @returns
   */
  async add(request: AddRecetteRequest): Promise<AddRecetteResponse> {
    const newRecette = await this.recetteService.create(request);
    return { recette: newRecette };
  }
}