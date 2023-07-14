import { Injectable } from '@nestjs/common';
import { Recette } from './entity/recette.entity';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class RecetteService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.RecetteCreateInput): Promise<Recette> {
    const result: Recette = await this.prisma.recette.create({ data });
    return result;
  }

  async findAll(): Promise<Recette[]> {
    const results: Recette[] = await this.prisma.recette.findMany();
    return results;
  }

  async findById(id: number): Promise<Recette> {
    const result: Recette | null = await this.prisma.recette.findUnique({
      where: { id },
    });
    if (!result) {
      throw new Error(`Recette with ID ${id} not found`);
    }
    return result;
  }
  async update(id: number, data: Prisma.RecetteUpdateInput): Promise<Recette> {
    console.log(id, data);
    const result: Recette | null = await this.prisma.recette.update({
      where: { id },
      data,
    });
    if (!result) {
      throw new Error(`Recette with ID ${id} not found`);
    }
    return result;
  }

  async findByName(nom: string): Promise<Recette> {
    const result: Recette | null = await this.prisma.recette.findFirst({
      where: {
        nom: {
          equals: nom,
        },
      },
    });
    if (!result) {
      throw new Error(`Recette with name ${nom} not found`);
    }
    return result;
  }

  async delete(id: number): Promise<Recette> {
    const result: Recette | null = await this.prisma.recette.delete({
      where: { id },
    });
    if (!result) {
      throw new Error(`Recette with ID ${id} not found`);
    }
    return result;
  }

  //*fonction de conversion vers Recette
  toRecettePb(recette: Recette): any {
    const recettePb = {
      id: recette.id,
      nom: recette.nom,
      description: recette.description,
      ingredients: recette.ingredients,
      instructions: recette.instructions,
      tempsPreparation: recette.tempsPreparation,
      tempsCuisson: recette.tempsCuisson,
      categorie: recette.categorie,
    };

    return recettePb;
  }
}
