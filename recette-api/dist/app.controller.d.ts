import { AppService } from './app.service';
import { AddRecetteRequest, AddRecetteResponse, DeleteRecetteRequest, DeleteRecetteResponse, GetRecetteRequest, GetRecetteResponse, RecetteServiceController, UpdateRecetteRequest, UpdateRecetteResponse, ListRecettesRequest, ListRecettesResponse } from './stubs/recette/v1alpha/recette';
import { Metadata } from '@grpc/grpc-js';
export declare class AppController implements RecetteServiceController {
    private readonly appService;
    constructor(appService: AppService);
    get(request: GetRecetteRequest, metadata?: Metadata): Promise<GetRecetteResponse>;
    list(request: ListRecettesRequest): Promise<ListRecettesResponse>;
    update(request: UpdateRecetteRequest, metadata?: Metadata): Promise<UpdateRecetteResponse>;
    delete(request: DeleteRecetteRequest, metadata?: Metadata): Promise<DeleteRecetteResponse>;
    add(request: AddRecetteRequest): Promise<AddRecetteResponse>;
}
