// import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
// import { PrismaClient } from '@prisma/client';
// @Injectable()
// export class PrismaService extends PrismaClient implements OnModuleInit {
//   async onModuleInit() {
//     await this.$connect();
//   }
//   async enableShutdownHooks(app: INestApplication) {
//     this.$on('beforeExit', async () => {
//       await app.close();
//     });
//   }
// }

import { PrismaClient } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { User } from '.prisma/client';

@Injectable()
export class PrismaService {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  get user(): typeof User {
    return this.prisma.user;
  }
}
