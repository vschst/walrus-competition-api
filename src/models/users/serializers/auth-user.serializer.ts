import { Injectable } from '@nestjs/common';
import { BaseSerializerService } from '@common/serializers/base.serializer';
import { GetUserDataDTO } from '@models/users/dto/user.dto';
import { IJwtAuthUser } from '@auth/interfaces/jwt-auth-user.interface';

@Injectable()
export class AuthUserSerializerService extends BaseSerializerService<
  IJwtAuthUser,
  GetUserDataDTO
> {
  public async serialize(authUser: IJwtAuthUser): Promise<GetUserDataDTO> {
    return {
      id: authUser.id,
      email: authUser.email,
      name: authUser.name,
    };
  }
}
