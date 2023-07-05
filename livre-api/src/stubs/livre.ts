/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "livre.v1alpha";

export interface Livre {
  id: number;
  titre: string;
  type: string;
  auteur: string;
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
}

export interface AddLivreResponse {
  livre: Livre | undefined;
}

export interface UpdateLivreRequest {
  id: number;
  titre: string;
  type: string;
  auteur: string;
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

export const LIVRE_V1ALPHA_PACKAGE_NAME = "livre.v1alpha";

export interface LivreServiceClient {
  get(request: GetLivreRequest, metadata?: Metadata): Observable<GetLivreResponse>;

  add(request: AddLivreRequest, metadata?: Metadata): Observable<AddLivreResponse>;

  update(request: UpdateLivreRequest, metadata?: Metadata): Observable<UpdateLivreResponse>;

  delete(request: DeleteLivreRequest, metadata?: Metadata): Observable<DeleteLivreResponse>;
}

export interface LivreServiceController {
  get(
    request: GetLivreRequest,
    metadata?: Metadata,
  ): Promise<GetLivreResponse> | Observable<GetLivreResponse> | GetLivreResponse;

  add(
    request: AddLivreRequest,
    metadata?: Metadata,
  ): Promise<AddLivreResponse> | Observable<AddLivreResponse> | AddLivreResponse;

  update(
    request: UpdateLivreRequest,
    metadata?: Metadata,
  ): Promise<UpdateLivreResponse> | Observable<UpdateLivreResponse> | UpdateLivreResponse;

  delete(
    request: DeleteLivreRequest,
    metadata?: Metadata,
  ): Promise<DeleteLivreResponse> | Observable<DeleteLivreResponse> | DeleteLivreResponse;
}

export function LivreServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["get", "add", "update", "delete"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("LivreService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("LivreService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const LIVRE_SERVICE_NAME = "LivreService";
