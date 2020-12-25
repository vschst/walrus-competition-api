import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from '@models/users/users.service';
import { JwtConfigService } from '@config/jwt/config.service';
import { IJwtPayload } from '@auth/interfaces/jwt.payload.interface';

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

  async validate({ id }: IJwtPayload) {
    const [isUserExists] = await this.userService.findOne(id);

    return isUserExists;
  }
}
