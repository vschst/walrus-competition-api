import {
  Controller,
  Get,
  Logger,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '@common/guards/jwt.auth.guard';
import { GetAuthUser } from '@common/decorators/requests/get.auth.user.decorator';
import { IJwtAuthUser } from '@auth/interfaces/jwt.auth.user.interface';
import { SerializerInterceptor } from '@common/interceptors/serializer.interceptor';
import { AuthUserSerializerService } from './serializers/auth.user.serializer';
import { GetUserResponseDTO } from './dto/user.dto';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard)
@UseInterceptors(SerializerInterceptor)
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private readonly authUserSeializer: AuthUserSerializerService) {}

  @Get('me')
  @ApiOperation({ summary: 'Get authenticated user' })
  getMyProfile(@GetAuthUser() authUser: IJwtAuthUser): GetUserResponseDTO {
    return {
      data: this.authUserSeializer.markSerializableValue(authUser),
    };
  }
}
