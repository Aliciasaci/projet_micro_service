import { Metadata } from "@grpc/grpc-js";
import { Observable } from "rxjs";
export declare const protobufPackage = "recette.v1alpha";
export interface Recette {
    id: number;
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
    recette: Recette;
}
export interface AddRecetteRequest {
    id: number;
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
export interface ListRecettesResponse {
    recettes: Recette[] | undefined;
}
export interface ListRecettesRequest {
}
export declare const RECETTE_V1ALPHA_PACKAGE_NAME = "recette.v1alpha";
export interface RecetteServiceClient {
    get(request: GetRecetteRequest, metadata?: Metadata): Observable<GetRecetteResponse>;
    add(request: AddRecetteRequest, metadata?: Metadata): Observable<AddRecetteResponse>;
    update(request: UpdateRecetteRequest, metadata?: Metadata): Observable<UpdateRecetteResponse>;
    delete(request: DeleteRecetteRequest, metadata?: Metadata): Observable<DeleteRecetteResponse>;
    list(request: ListRecettesRequest, metadata?: Metadata): Observable<ListRecettesResponse>;
}
export interface RecetteServiceController {
    get(request: GetRecetteRequest, metadata?: Metadata): Promise<GetRecetteResponse> | Observable<GetRecetteResponse> | GetRecetteResponse;
    add(request: AddRecetteRequest, metadata?: Metadata): Promise<AddRecetteResponse> | Observable<AddRecetteResponse> | AddRecetteResponse;
    update(request: UpdateRecetteRequest, metadata?: Metadata): Promise<UpdateRecetteResponse> | Observable<UpdateRecetteResponse> | UpdateRecetteResponse;
    delete(request: DeleteRecetteRequest, metadata?: Metadata): Promise<DeleteRecetteResponse> | Observable<DeleteRecetteResponse> | DeleteRecetteResponse;
    list(request: ListRecettesRequest, metadata?: Metadata): Promise<ListRecettesResponse> | Observable<ListRecettesResponse> | ListRecettesResponse;
}
export declare function RecetteServiceControllerMethods(): (constructor: Function) => void;
export declare const RECETTE_SERVICE_NAME = "RecetteService";
