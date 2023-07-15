import { Injectable } from '@nestjs/common';
import { Livre } from './proto/livre.pb';
import { Recette } from './proto/recette.pb';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class LivreService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.LivreCreateInput): Promise<Livre> {
    const result: Livre = await this.createWithEmptyRecette(data);
    return result;
  }

  async findAll(): Promise<Livre[]> {
    const results: (Livre & { recettes: Recette[] })[] =
      await this.prisma.livre.findMany({
        include: {
          recettes: true,
        },
      });
    return results;
  }

  async findById(id: number): Promise<Livre> {
    const result: Livre | null = (await this.prisma.livre.findUnique({
      where: { id },
    })) as Livre;
    if (!result) {
      throw new Error(`Livre with ID ${id} not found`);
    }
    return result;
  }

  async update(id: number, data: Prisma.LivreUpdateInput): Promise<Livre> {
    const result = await this.prisma.livre.update({
      where: { id },
      data,
    });
    if (!result) {
      throw new Error(`Livre with ID ${id} not found`);
    }
    return result as Livre;
  }

  async findByName(titre: string): Promise<Livre> {
    const result: Livre | null = (await this.prisma.livre.findFirst({
      where: {
        titre: {
          equals: titre,
        },
      },
    })) as Livre;
    if (!result) {
      throw new Error(`Livre with name ${titre} not found`);
    }
    return result;
  }

  async addRecetteToLivre(id: number, data: Recette): Promise<Livre> {
    const recetteLivre: Prisma.RecetteCreateInput = this.fromRecetteToLivreRecette(id, data);
    const result: Livre | null = await this.prisma.livre.update({
      where: { id },
      data: {
        recettes: {
          create: [recetteLivre],
        },
      },
      include: {
        recettes: true,
      },
    });
    if (!result) {
      throw new Error(`Livre with ID ${id} not found`);
    }
    return result;
  }

  async delete(id: number): Promise<Livre> {
    const result: Livre | null = (await this.prisma.livre.delete({
      where: { id },
    })) as Livre;
    if (!result) {
      throw new Error(`Livre with ID ${id} not found`);
    }
    return result;
  }

  async createWithEmptyRecette(data: Prisma.LivreCreateInput): Promise<Livre> {
    const result: Livre = await this.prisma.livre.create({
      data: {
        titre: data.titre,
        type: data.type,
        auteur: data.auteur,
        recettes: {
          create: [],
        },
        user_id: data.user_id,
      },
    }) as Livre;
    return result;
  }

  toLivrePb(livre: Livre & { recettes: Recette[] }): Livre {
    const transformedRecettes = livre.recettes.map((recette) =>
      this.fromRecetteToLivreRecette(livre.id, recette),
    );
    const livrePb: Livre = {
      id: livre.id,
      titre: livre.titre,
      type: livre.type,
      auteur: livre.auteur,
      recettes: transformedRecettes,
      user_id: livre.user_id,
    };
    return livrePb;
  }

  fromRecetteToLivreRecette(id: number, recette: Recette): Recette {
    const recetteLivre: Prisma.RecetteCreateInput = {
      nom: recette.nom,
      description: recette.description,
      ingredients: recette.ingredients,
      instructions: recette.instructions,
      tempsCuisson: recette.tempsCuisson,
      tempsPreparation: recette.tempsPreparation,
      categorie: recette.categorie,
      livre: {
        connect: {
          id: id,
        },
      },
    };
    return recetteLivre as Recette;
  }
}
