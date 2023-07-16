import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { JwtService } from './jwt.service';
import { RegisterRequestDto, LoginRequestDto, ValidateRequestDto } from '../auth.dto';
import { Auth } from '@prisma/client';
import { LoginResponse, RegisterResponse, ValidateResponse } from '../auth.pb';

@Injectable()
export class AuthService {
  private readonly prisma: PrismaService;
  private readonly jwtService: JwtService;

  constructor(prisma: PrismaService, jwtService: JwtService) {
    this.prisma = prisma;
    this.jwtService = jwtService;
  }

  public async register({ email, password }: RegisterRequestDto): Promise<RegisterResponse> {
    const existingAuth: Auth = await this.prisma.auth.findUnique({ where: { email } });

    if (existingAuth) {
      return { status: HttpStatus.CONFLICT, error: ['E-Mail already exists'] };
    }

    const hashedPassword: string = this.jwtService.encodePassword(password);

    await this.prisma.auth.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    return { status: HttpStatus.CREATED, error: null };
  }

  public async login({ email, password }: LoginRequestDto): Promise<LoginResponse> {
    const auth: Auth | null = await this.prisma.auth.findUnique({ where: { email } });

    if (!auth) {
      return { status: HttpStatus.NOT_FOUND, error: ['E-Mail not found'], token: null };
    }

    const isPasswordValid: boolean = this.jwtService.isPasswordValid(password, auth.password);

    if (!isPasswordValid) {
      return { status: HttpStatus.NOT_FOUND, error: ['Password wrong'], token: null };
    }

    const token: string = this.jwtService.generateToken(auth);

    return { token, status: HttpStatus.OK, error: null };
  }

  public async validate({ token }: ValidateRequestDto): Promise<ValidateResponse> {
    const decoded: Auth = await this.jwtService.verify(token);

    if (!decoded) {
      return { status: HttpStatus.FORBIDDEN, error: ['Token is invalid'], userId: null };
    }

    const auth: Auth | null = await this.prisma.auth.findUnique({ where: { id: decoded.id } });

    if (!auth) {
      return { status: HttpStatus.CONFLICT, error: ['User not found'], userId: null };
    }

    return { status: HttpStatus.OK, error: null, userId: decoded.id };
  }
}