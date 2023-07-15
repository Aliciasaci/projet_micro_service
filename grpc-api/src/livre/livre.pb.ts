/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Recette } from './recette.pb';

export const protobufPackage = 'livre';

export interface Livre {
  id: number;
  titre: string;
  type: string;
  auteur: string;
  recettes: Recette[];
  user_id: number;
}

export interface GetLivreRequest {
  id: number;
  titre: string;
}

export interface GetLivreResponse {
  livres: Livre[];
}

export interface AddLivreRequest {
  titre: string;
  type: string;
  auteur: string;
  recettes: Recette[];
}

export interface AddLivreResponse {
  livre: Livre | undefined;
}

export interface AddRecetteToLivreRequest {
  id: number;
  recette: Recette | undefined;
}

export interface AddRecetteToLivreResponse {
  livre: Livre | undefined;
}

export interface UpdateLivreRequest {
  id: number;
  data: Livre | undefined;
}

export interface UpdateLivreResponse {
  livre: Livre | undefined;
}

export interface DeleteLivreRequest {
  id: number;
}

export interface DeleteLivreResponse {
  success: boolean;
}

export interface ListLivreRequest {}

export interface ListLivreResponse {
  livres: Livre[];
}

export const LIVRE_PACKAGE_NAME = 'livre';

export interface LivreServiceClient {
  get(request: GetLivreRequest): Observable<GetLivreResponse>;

  add(request: AddLivreRequest): Observable<AddLivreResponse>;

  addRecetteToLivre(
    request: AddRecetteToLivreRequest,
  ): Observable<AddRecetteToLivreResponse>;

  update(request: UpdateLivreRequest): Observable<UpdateLivreResponse>;

  delete(request: DeleteLivreRequest): Observable<DeleteLivreResponse>;

  list(request: ListLivreRequest): Observable<ListLivreResponse>;
}

export interface LivreServiceController {
  get(
    request: GetLivreRequest,
  ):
    | Promise<GetLivreResponse>
    | Observable<GetLivreResponse>
    | GetLivreResponse;

  add(
    request: AddLivreRequest,
  ):
    | Promise<AddLivreResponse>
    | Observable<AddLivreResponse>
    | AddLivreResponse;

  addRecetteToLivre(
    request: AddRecetteToLivreRequest,
  ):
    | Promise<AddRecetteToLivreResponse>
    | Observable<AddRecetteToLivreResponse>
    | AddRecetteToLivreResponse;

  update(
    request: UpdateLivreRequest,
  ):
    | Promise<UpdateLivreResponse>
    | Observable<UpdateLivreResponse>
    | UpdateLivreResponse;

  delete(
    request: DeleteLivreRequest,
  ):
    | Promise<DeleteLivreResponse>
    | Observable<DeleteLivreResponse>
    | DeleteLivreResponse;

  list(
    request: ListLivreRequest,
  ):
    | Promise<ListLivreResponse>
    | Observable<ListLivreResponse>
    | ListLivreResponse;
}

export function LivreServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      'get',
      'add',
      'addRecetteToLivre',
      'update',
      'delete',
      'list',
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcMethod('LivreService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method,
      );
      GrpcStreamMethod('LivreService', method)(
        constructor.prototype[method],
        method,
        descriptor,
      );
    }
  };
}

export const LIVRE_SERVICE_NAME = 'LivreService';
