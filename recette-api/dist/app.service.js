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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./prisma.service");
let AppService = class AppService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const result = await this.prisma.recette.create({ data });
        const recette = {
            id: result.id,
            nom: result.nom,
            description: result.description,
            ingredients: result.ingredients,
            instructions: result.instructions,
            temps_preparation: result.temps_preparation,
            temps_cuisson: result.temps_cuisson,
        };
        return recette;
    }
    async findAll() {
        const results = await this.prisma.recette.findMany();
        const recettes = results.map((result) => ({
            id: result.id,
            nom: result.nom,
            description: result.description,
            ingredients: result.ingredients,
            instructions: result.instructions,
            temps_preparation: result.temps_preparation,
            temps_cuisson: result.temps_cuisson,
        }));
        return recettes;
    }
    async findById(id) {
        const result = await this.prisma.recette.findUnique({
            where: { id },
        });
        if (!result) {
            throw new Error(`Recette with ID ${id} not found`);
        }
        const recette = {
            id: result.id,
            nom: result.nom,
            description: result.description,
            ingredients: result.ingredients,
            instructions: result.instructions,
            temps_preparation: result.temps_preparation,
            temps_cuisson: result.temps_cuisson,
        };
        return recette;
    }
    async update(id, data) {
        const result = await this.prisma.recette.update({
            where: { id },
            data,
        });
        if (!result) {
            throw new Error(`Recette with ID ${id} not found`);
        }
        const recette = {
            id: result.id,
            nom: result.nom,
            description: result.description,
            ingredients: result.ingredients,
            instructions: result.instructions,
            temps_preparation: result.temps_preparation,
            temps_cuisson: result.temps_cuisson,
        };
        return recette;
    }
    async findByName(nom) {
        return this.prisma.recette.findFirst({
            where: {
                nom: {
                    equals: nom,
                },
            },
        });
    }
    async delete(id) {
        const result = await this.prisma.recette.delete({
            where: { id },
        });
        if (!result) {
            throw new Error(`Recette with ID ${id} not found`);
        }
        const recette = {
            id: result.id,
            nom: result.nom,
            description: result.description,
            ingredients: result.ingredients,
            instructions: result.instructions,
            temps_preparation: result.temps_preparation,
            temps_cuisson: result.temps_cuisson,
        };
        return recette;
    }
};
AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AppService);
exports.AppService = AppService;
//# sourceMappingURL=app.service.js.map