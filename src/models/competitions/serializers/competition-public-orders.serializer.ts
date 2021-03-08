import { Injectable } from '@nestjs/common';
import { BaseSerializerService } from '@common/serializers/base.serializer';
import { Competition } from '@models/competitions/entities/competition.entity';
import { GetCompetitionPublicOrdersDataDTO } from '@models/competitions/dto/competition-public-orders.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CompetitionPublicOrdersSerializer extends BaseSerializerService<
  Competition,
  GetCompetitionPublicOrdersDataDTO
> {
  public async serialize(
    competitionPublicOrders: Competition,
  ): Promise<GetCompetitionPublicOrdersDataDTO> {
    return plainToClass(
      GetCompetitionPublicOrdersDataDTO,
      competitionPublicOrders,
      {
        excludeExtraneousValues: true,
      },
    );
  }
}
