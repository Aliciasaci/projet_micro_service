import { Injectable } from '@nestjs/common';
import { Recette } from './stubs/recette/v1alpha/recette';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) { }

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
}
