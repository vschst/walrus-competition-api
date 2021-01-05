import { Injectable, Logger, ForbiddenException } from '@nestjs/common';
import { UsersService } from '@models/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialsRequestDTO } from './dto/auth-credentials.dto';
import { User } from '@models/users/entities/user.entity';
import { IJwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const [isUserExists, user] = await this.usersService.findByEmail(email);

    if (!isUserExists) {
      throw new ForbiddenException('User with this email was not found');
    }

    const isValidPassword = await user.validatePassword(password);

    if (!isValidPassword) {
      throw new ForbiddenException('Invalid user password');
    }

    return user;
  }

  async signToken(user: User) {
    const payload: IJwtPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };
    return this.jwtService.sign(payload, {
      expiresIn: '60m',
    });
  }

  async login(authCredentialsRequestDTO: AuthCredentialsRequestDTO) {
    const { email, password } = authCredentialsRequestDTO;
    const user = await this.validateUser(email, password);
    const token = await this.signToken(user);

    return {
      access_token: token,
    };
  }
}
