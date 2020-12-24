import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '@models/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigModule } from '@config/jwt/config.module';
import { JwtConfigService } from '@config/jwt/config.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [JwtConfigModule],
      inject: [JwtConfigService],
      useFactory: async (jwtConfigService: JwtConfigService) => {
        const { secret } = jwtConfigService;

        return { secret, verifyOptions: { ignoreExpiration: false } };
      },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService, JwtStrategy],
})
export class AuthModule {}
