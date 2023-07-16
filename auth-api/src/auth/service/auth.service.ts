import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { JwtService } from './jwt.service';
import { RegisterRequestDto, LoginRequestDto, ValidateRequestDto } from '../auth.dto';
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
    const existingUser = await this.prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return { status: HttpStatus.CONFLICT, error: ['E-Mail already exists'] };
    }

    const hashedPassword = this.jwtService.encodePassword(password);

    await this.prisma.user.create({ data: { email, password: hashedPassword } });

    return { status: HttpStatus.CREATED, error: null };
  }

  public async login({ email, password }: LoginRequestDto): Promise<LoginResponse> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      return { status: HttpStatus.NOT_FOUND, error: ['E-Mail not found'], token: null };
    }

    const isPasswordValid = this.jwtService.isPasswordValid(password, user.password);

    if (!isPasswordValid) {
      return { status: HttpStatus.NOT_FOUND, error: ['Password wrong'], token: null };
    }

    const token = this.jwtService.generateToken(user.id, user.email);

    return { token, status: HttpStatus.OK, error: null };
  }

  public async validate({ token }: ValidateRequestDto): Promise<ValidateResponse> {
    const decoded = await this.jwtService.verify(token);

    if (!decoded) {
      return { status: HttpStatus.FORBIDDEN, error: ['Token is invalid'], userId: null };
    }

    const user = await this.prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) {
      return { status: HttpStatus.CONFLICT, error: ['User not found'], userId: null };
    }

    return { status: HttpStatus.OK, error: null, userId: decoded.id };
  }
}
