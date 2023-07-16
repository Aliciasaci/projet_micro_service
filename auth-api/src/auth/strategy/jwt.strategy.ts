// import { Injectable, Inject } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { Auth } from '../auth.entity';
// import { JwtService } from '../service/jwt.service';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   @Inject(JwtService)
//   private readonly jwtService: JwtService;

//   constructor() {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: 'dev',
//       ignoreExpiration: true,
//     });
//   }

//   private validate(token: string): Promise<Auth | never> {
//     return this.jwtService.validateUser(token);
//   }
// }

import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../prisma.service';
import { JwtService } from '../service/jwt.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly prisma: PrismaService;
  private readonly jwtService: JwtService;

  constructor(prisma: PrismaService, jwtService: JwtService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'dev',
      ignoreExpiration: true,
    });
    this.prisma = prisma;
    this.jwtService = jwtService;
  }

  private async validate(token: string): Promise<Auth | never> {
    const decoded = this.jwtService.verify(token);
    if (!decoded) {
      throw new Error('Invalid token');
    }
    const auth = await this.prisma.auth.findUnique({ where: { id: decoded.id } });
    if (!auth) {
      throw new Error('User not found');
    }
    return auth;
  }
}
