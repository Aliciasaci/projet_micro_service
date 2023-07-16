import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ValidateRequest,
  ValidateResponse,
  AuthServiceController,
  AuthServiceControllerMethods } from './auth/auth.pb';
import { Metadata } from '@grpc/grpc-js';

@Controller()
@AuthServiceControllerMethods()
export class AppController implements AuthServiceController {
  constructor(private readonly appService: AppService) {}

  async register(request: RegisterRequest, metadata?: Metadata): Promise<RegisterResponse> {
    return this.appService.register(request);
  }

  async login(request: LoginRequest, metadata?: Metadata): Promise<LoginResponse> {
    return this.appService.login(request);
  }

  async validate(request: ValidateRequest, metadata?: Metadata): Promise<ValidateResponse> {
    return this.appService.validate(request);
  }
}
