import { Injectable } from '@nestjs/common';
import { BaseSerializerService } from '@common/serializers/base.serializer';
import { CompetitionPublicOrders } from '@models/competitions/entities/competition-public-orders.entity';
import { GetCompetitionPublicOrdersDataDTO } from '@models/competitions/dto/competition-public-orders.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class CompetitionPublicOrdersSerializer extends BaseSerializerService<
  CompetitionPublicOrders,
  GetCompetitionPublicOrdersDataDTO
> {
  public async serialize(
    competitionPublicOrders: CompetitionPublicOrders,
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
