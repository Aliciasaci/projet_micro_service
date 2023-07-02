/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "recette.v1alpha";

export interface Recette {
  id: number;
  nom: string;
  description: string;
  ingredients: string;
  instructions: string;
  temps_preparation: number;
  temps_cuisson: number;
}

export interface GetRecetteRequest {
  nom: string;
  id: number;
}

export interface GetRecetteResponse {
  recettes: Recette[];
}

export interface AddRecetteRequest {
  id: number;
  nom: string;
  description: string;
  ingredients: string;
  instructions: string;
  temps_preparation: number;
  temps_cuisson: number;
}

export interface AddRecetteResponse {
  recette: Recette | undefined;
}

export interface UpdateRecetteRequest {
  id: number;
  data: Partial<Recette>;
}

export interface UpdateRecetteResponse {
  recette: Recette | undefined;
}

export interface DeleteRecetteRequest {
  nom: string;
  id: number;
}

export interface DeleteRecetteResponse {
  message: string;
}

export const RECETTE_V1ALPHA_PACKAGE_NAME = "recette.v1alpha";

export interface RecetteServiceClient {
  get(request: GetRecetteRequest, metadata?: Metadata): Observable<GetRecetteResponse>;

  add(request: AddRecetteRequest, metadata?: Metadata): Observable<AddRecetteResponse>;

  update(request: UpdateRecetteRequest, metadata?: Metadata): Observable<UpdateRecetteResponse>;

  delete(request: DeleteRecetteRequest, metadata?: Metadata): Observable<DeleteRecetteResponse>;
}

export interface RecetteServiceController {
  get(
    request: GetRecetteRequest,
    metadata?: Metadata,
  ): Promise<GetRecetteResponse> | Observable<GetRecetteResponse> | GetRecetteResponse;

  add(
    request: AddRecetteRequest,
    metadata?: Metadata,
  ): Promise<AddRecetteResponse> | Observable<AddRecetteResponse> | AddRecetteResponse;

  update(
    request: UpdateRecetteRequest,
    metadata?: Metadata,
  ): Promise<UpdateRecetteResponse> | Observable<UpdateRecetteResponse> | UpdateRecetteResponse;

  delete(
    request: DeleteRecetteRequest,
    metadata?: Metadata,
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
