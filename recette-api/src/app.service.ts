//fichier qui implémente le service prisma et écrit une fonction pour le CRUD recette
import { Injectable } from '@nestjs/common';
import { Recette } from './stubs/recette/v1alpha/recette';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) { }

  /**
   * 
   * @param data 
   * @returns 
   */
  async create(data: Prisma.RecetteCreateInput): Promise<Recette> {
    const result: PrismaRecette = await this.prisma.recette.create({ data });
    const recette: Recette = {
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

  /**
   * 
   * @returns tableau de recette
   */
  async findAll(): Promise<Recette[]> {
    const results: PrismaRecette[] = await this.prisma.recette.findMany();
    const recettes: Recette[] = results.map((result: PrismaRecette) => ({
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

  /**
   * 
   * @param id 
   * @returns Objet recette
   */
  async findById(id: number): Promise<Recette> {
    const result: PrismaRecette | null = await this.prisma.recette.findUnique({
      where: { id },
    });
    if (!result) {
      throw new Error(`Recette with ID ${id} not found`);
    }
    const recette: Recette = {
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

  /**
   * 
   * @param id 
   * @param data 
   * @returns 
   */
  async update(id: number, data: Prisma.RecetteUpdateInput): Promise<Recette> {
    const result: PrismaRecette | null = await this.prisma.recette.update({
      where: { id },
      data,
    });
    if (!result) {
      throw new Error(`Recette with ID ${id} not found`);
    }
    const recette: Recette = {
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


  async findByName(nom: string): Promise<Recette> {
    return this.prisma.recette.findFirst({
      where: {
        nom: {
          equals: nom,
        },
      },
    });
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  async delete(id: number): Promise<Recette> {
    const result: PrismaRecette | null = await this.prisma.recette.delete({
      where: { id },
    });
    if (!result) {
      throw new Error(`Recette with ID ${id} not found`);
    }
    const recette: Recette = {
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
}
