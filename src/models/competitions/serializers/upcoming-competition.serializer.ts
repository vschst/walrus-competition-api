import { Injectable } from '@nestjs/common';
import { BaseSerializerService } from '@common/serializers/base.serializer';
import { Competition } from '@models/competitions/entities/competition.entity';
import { GetPublicUpcomingCompetitionListItemDTO } from '../dto/public-upcoming-competitions.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UpcomingCompetitionSerializer extends BaseSerializerService<
  Competition,
  GetPublicUpcomingCompetitionListItemDTO
> {
  public async serialize(
    competition: Competition,
  ): Promise<GetPublicUpcomingCompetitionListItemDTO> {
    return plainToClass(GetPublicUpcomingCompetitionListItemDTO, competition);
  }
}
