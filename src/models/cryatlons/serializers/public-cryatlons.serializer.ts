import { Injectable } from '@nestjs/common';
import { BaseSerializerService } from '@common/serializers/base.serializer';
import { Cryatlon } from '@models/cryatlons/entities/cryatlon.entity';
import { GetPublicCryatlonListItemDTO } from '../dto/public-cryatlons.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class PublicCryatlonsSerializerService extends BaseSerializerService<
  Cryatlon,
  GetPublicCryatlonListItemDTO
> {
  public async serialize(
    cryatlon: Cryatlon,
  ): Promise<GetPublicCryatlonListItemDTO> {
    return plainToClass(GetPublicCryatlonListItemDTO, cryatlon, {
      excludeExtraneousValues: true,
    });
  }
}
