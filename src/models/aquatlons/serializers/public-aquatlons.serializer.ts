import { Injectable } from '@nestjs/common';
import { BaseSerializerService } from '@common/serializers/base.serializer';
import { Aquatlon } from '../entities/aquatlon.entity';
import { GetPublicAquatlonListItemDTO } from '../dto/public-aquatlons.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class PublicAquatlonsSerializerService extends BaseSerializerService<
  Aquatlon,
  GetPublicAquatlonListItemDTO
> {
  public async serialize(
    aquatlon: Aquatlon,
  ): Promise<GetPublicAquatlonListItemDTO> {
    return plainToClass(GetPublicAquatlonListItemDTO, aquatlon, {
      excludeExtraneousValues: true,
    });
  }
}
