import { Controller, Logger, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsRequestDTO } from './dto/auth.credentials.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthLoginResponseDTO } from '@auth/dto/auth.login.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  private logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  //@HttpCode(200)
  @ApiOperation({ summary: 'Login as a user' })
  async login(
    @Body() authCredentialsRequestDTO: AuthCredentialsRequestDTO,
  ): Promise<AuthLoginResponseDTO> {
    const { access_token } = await this.authService.login(
      authCredentialsRequestDTO,
    );

    return {
      access_token,
      token_type: 'bearer',
    };
  }
}
