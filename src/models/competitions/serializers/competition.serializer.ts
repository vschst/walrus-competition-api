import { Injectable } from '@nestjs/common';
import { BaseSerializerService } from '@common/serializers/base.serializer';
import { Competition } from '@models/competitions/entities/competition.entity';
import { GetCompetitionDataDTO } from '@models/competitions/dto/competition.dto';

@Injectable()
export class CompetitionSerializer extends BaseSerializerService<
  Competition,
  GetCompetitionDataDTO
> {
  public async serialize(
    competition: Competition,
  ): Promise<GetCompetitionDataDTO> {
    return {
      id: competition.id,
      name: competition.name,
      start_date: competition.start_date,
      end_date: competition.end_date,
      races: competition.races,
      relays: competition.relays,
      cryathlons: competition.cryatlons,
    };
  }
}
