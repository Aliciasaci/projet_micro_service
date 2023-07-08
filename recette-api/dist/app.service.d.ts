import { Recette } from './stubs/recette/v1alpha/recette';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';
export declare class AppService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.RecetteCreateInput): Promise<Recette>;
    findAll(): Promise<Recette[]>;
    findById(id: number): Promise<Recette>;
    update(id: number, data: Prisma.RecetteUpdateInput): Promise<Recette>;
    findByName(nom: string): Promise<Recette>;
    delete(id: number): Promise<Recette>;
    toRecettePb(recette: Recette): any;
}
