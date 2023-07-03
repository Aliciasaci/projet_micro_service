"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const recette_1 = require("./stubs/recette/v1alpha/recette");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    async get(request, metadata) {
        let recette;
        let recettes = [];
        if (request.id) {
            recette = await this.appService.findById(request.id);
            return { recettes: [recette] };
        }
        else if (request.nom) {
            recette = await this.appService.findByName(request.nom);
            return { recettes: [recette] };
        }
        else {
            recettes = await this.appService.findAll();
            return { recettes };
        }
    }
    async update(request, metadata) {
        const updatedRecette = await this.appService.update(request.id, request.data);
        return { recette: updatedRecette };
    }
    async delete(request, metadata) {
        const deletedRecette = await this.appService.delete(request.id);
        return { message: `Recette with ID ${deletedRecette.id} has been deleted` };
    }
    async add(request) {
        const newRecette = await this.appService.create(request);
        return { recette: newRecette };
    }
};
AppController = __decorate([
    (0, common_1.Controller)(),
    (0, recette_1.RecetteServiceControllerMethods)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map