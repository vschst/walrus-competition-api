import { Injectable } from '@nestjs/common';
import { BaseSerializerService } from '@common/serializers/base.serializer';
import { Race } from '@models/races/entities/race.entity';
import { GetPublicRaceListItemDTO } from '../dto/public-races.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class PublicRacesSerializerService extends BaseSerializerService<
  Race,
  GetPublicRaceListItemDTO
> {
  public async serialize(race: Race): Promise<GetPublicRaceListItemDTO> {
    return plainToClass(GetPublicRaceListItemDTO, race, {
      excludeExtraneousValues: true,
    });
  }
}
