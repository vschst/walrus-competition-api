import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UsersService } from '@models/users/users.service';
import { JwtConfigService } from '@config/jwt/config.service';
import { IJwtPayload } from '@auth/interfaces/jwt.payload.interface';
import { IJwtAuthUser } from '@auth/interfaces/jwt.auth.user.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtConfigService: JwtConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfigService.secret,
    });
  }

  async validate({ id }: IJwtPayload): Promise<IJwtAuthUser> {
    const [isUserExists, user] = await this.userService.findOne(id);

    if (!isUserExists) {
      throw new InternalServerErrorException('User from jwt payload not found');
    }

    return { id: user.id, email: user.email, name: user.name };
  }
}
