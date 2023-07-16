import { Injectable } from '@nestjs/common';
import { JwtService as Jwt } from '@nestjs/jwt';
import { PrismaService } from './prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class JwtService {
  private readonly jwt: Jwt;
  private readonly prisma: PrismaService;

  constructor(jwt: Jwt, prisma: PrismaService) {
    this.jwt = jwt;
    this.prisma = prisma;
  }

  public async decode(token: string): Promise<unknown> {
    return this.jwt.decode(token, null);
  }

  public async validateUser(decoded: any): Promise<any> {
    return this.prisma.auth.findUnique({ where: { id: decoded.id } });
  }

  public generateToken(auth: any): string {
    return this.jwt.sign({ id: auth.id, email: auth.email });
  }

  public isPasswordValid(password: string, userPassword: string): boolean {
    return bcrypt.compareSync(password, userPassword);
  }

  public encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
  }

  public async verify(token: string): Promise<any> {
    try {
      return this.jwt.verify(token);
    } catch (err) {}
  }
}