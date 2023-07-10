/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "recette";

export interface Recette {
  nom: string;
  description: string;
  ingredients: string;
  instructions: string;
  tempsPreparation: number;
  tempsCuisson: number;
  categorie: string;
}

export interface GetRecetteRequest {
  nom: string;
  id: number;
}

export interface GetRecetteResponse {
  recettes: Recette | undefined;
}

export interface AddRecetteRequest {
  nom: string;
  description: string;
  ingredients: string;
  instructions: string;
  tempsPreparation: number;
  tempsCuisson: number;
  categorie: string;
}

export interface AddRecetteResponse {
  recette: Recette | undefined;
}

export interface UpdateRecetteRequest {
  recette: Recette | undefined;
}

export interface UpdateRecetteResponse {
  recette: Recette | undefined;
}

export interface DeleteRecetteRequest {
  id: number;
}

export interface DeleteRecetteResponse {
  message: string;
}

export const RECETTE_PACKAGE_NAME = "recette";

export interface RecetteServiceClient {
  get(request: GetRecetteRequest): Observable<GetRecetteResponse>;

  add(request: AddRecetteRequest): Observable<AddRecetteResponse>;

  update(request: UpdateRecetteRequest): Observable<UpdateRecetteResponse>;

  delete(request: DeleteRecetteRequest): Observable<DeleteRecetteResponse>;
}

export interface RecetteServiceController {
  get(request: GetRecetteRequest): Promise<GetRecetteResponse> | Observable<GetRecetteResponse> | GetRecetteResponse;

  add(request: AddRecetteRequest): Promise<AddRecetteResponse> | Observable<AddRecetteResponse> | AddRecetteResponse;

  update(
    request: UpdateRecetteRequest,
  ): Promise<UpdateRecetteResponse> | Observable<UpdateRecetteResponse> | UpdateRecetteResponse;

  delete(
    request: DeleteRecetteRequest,
  ): Promise<DeleteRecetteResponse> | Observable<DeleteRecetteResponse> | DeleteRecetteResponse;
}

export function RecetteServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["get", "add", "update", "delete"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("RecetteService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("RecetteService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const RECETTE_SERVICE_NAME = "RecetteService";
