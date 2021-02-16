import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CompetitionService } from './competition.service';
import { CompetitionSerializer } from './serializers/competition.serializer';
import { IdParamDTO } from '@common/dto/id-param.dto';
import { GetCompetitionResponseDTO } from './dto/competition.dto';
import { SerializerInterceptor } from '@common/interceptors/serializer.interceptor';

@ApiTags('competitions')
@Controller('competitions')
@UseInterceptors(SerializerInterceptor)
export class CompetitionsController {
  constructor(
    private readonly competitionService: CompetitionService,
    private readonly competitionSerializerService: CompetitionSerializer,
  ) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get competition by ID' })
  @ApiParam({ name: 'id', description: 'Competition ID' })
  async getCompetition(
    @Param() { id }: IdParamDTO,
  ): Promise<GetCompetitionResponseDTO> {
    const [
      isCompetitionExist,
      competition,
    ] = await this.competitionService.findOne(id, true);

    if (!isCompetitionExist) {
      throw new NotFoundException('Competition not found');
    }

    return {
      data: this.competitionSerializerService.markSerializableValue(
        competition,
      ),
    };
  }
}
