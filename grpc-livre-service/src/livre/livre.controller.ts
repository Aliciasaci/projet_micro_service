import { Controller } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { LivreService } from './livre.service';
import {
  AddLivreRequest,
  AddLivreResponse,
  AddRecetteToLivreRequest,
  AddRecetteToLivreResponse,
  DeleteLivreRequest,
  DeleteLivreResponse,
  GetLivreRequest,
  GetLivreResponse,
  Livre,
  LivreServiceController,
  ListLivreRequest,
  ListLivreResponse,
  UpdateLivreRequest,
  UpdateLivreResponse,
} from './proto/livre.pb';
import { Metadata } from '@grpc/grpc-js';

@Controller('livre')
export class LivreController implements LivreServiceController {
  constructor(private readonly livreService: LivreService) {}

  /**
   * @param request
   * @param metadata
   * @returns
   */
  async get(
    request: GetLivreRequest,
    metadata?: Metadata,
  ): Promise<GetLivreResponse> {
    let livre: Livre;

    if (request.id) {
      livre = await this.livreService.findById(request.id);
      return { livres: [livre] };
    } else if (request.titre) {
      livre = await this.livreService.findByName(request.titre);
      return { livres: [livre] };
    }
  }

  async list(request: ListLivreRequest): Promise<ListLivreResponse> {
    try {
      const livres = await this.livreService.findAll();
      const livresList = livres.map(this.livreService.toLivrePb);
      return { livres: livresList };
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
    request: UpdateLivreRequest,
    metadata?: Metadata,
): Promise<UpdateLivreResponse> {
    try {
        const livre = await this.livreService.update(request.id, {
            titre: request.data.titre,
            auteur: request.data.auteur,
            type: request.data.type,
            user_id: request.data.user_id,
            recettes: {
                connect: request.data.recettes.map((recette) => ({ id: recette.id })),
            },
        });
        return { livre };
    } catch (error) {
        throw new RpcException(error);
    }
}

  /**
   * @param request
   * @param metadata
   * @returns
   */
  async addRecetteToLivre(
    request: AddRecetteToLivreRequest,
    metadata?: Metadata,
  ): Promise<AddRecetteToLivreResponse> {
    try {
      const livre = await this.livreService.addRecetteToLivre(
        request.id,
        request.recette,
      );
      return { livre };
    } catch (error) {
      throw new RpcException(error);
    }
  }

  /**
   * @param request
   * @param metadata
   * @returns
   */
  async add(request: AddLivreRequest): Promise<AddLivreResponse> {
      const livre = await this.livreService.create({
          titre: request.titre,
          auteur: request.auteur,
          type: request.type,
          user_id: request.user_id,
      });
        return { livre };
  }

  /**
   * @param request
   * @param metadata
   * @returns
   */
  async delete(
    request: DeleteLivreRequest,
    metadata?: Metadata,
  ): Promise<DeleteLivreResponse> {
    try {
      const livre = await this.livreService.delete(request.id);
      return { success: true };
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
