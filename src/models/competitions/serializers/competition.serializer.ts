import { Injectable } from '@nestjs/common';
import { BaseSerializerService } from '@common/serializers/base.serializer';
import { Competition } from '@models/competitions/entities/competition.entity';
import { GetCompetitionDataDTO } from '@models/competitions/dto/competition.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CompetitionSerializer extends BaseSerializerService<
  Competition,
  GetCompetitionDataDTO
> {
  public async serialize(
    competition: Competition,
  ): Promise<GetCompetitionDataDTO> {
    return plainToClass(GetCompetitionDataDTO, competition);
  }
}
