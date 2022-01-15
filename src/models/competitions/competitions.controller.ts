import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { CompetitionService } from './competition.service';
import { CompetitionSerializer } from './serializers/competition.serializer';
import { IdParamDTO } from '@common/dto/id-param.dto';
import { GetCompetitionResponseDTO } from './dto/competition.dto';
import { SerializerInterceptor } from '@common/interceptors/serializer.interceptor';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { AuthSkip } from '@common/decorators/requests/auth-skip.decorador';
import { PublicRacesService } from '@models/races/public-races.service';
import { PublicRelaysService } from '@models/relays/public-relays.service';
import { PublicCryatlonsService } from '@models/cryatlons/public-cryatlons.service';
import { PublicAquatlonsService } from '@models/aquatlons/public-aquatlons.service';
import { GetCompetitionPublicOrdersResponseDTO } from './dto/competition-public-orders.dto';
import { Competition } from './entities/competition.entity';
import { CompetitionPublicOrdersSerializer } from './serializers/competition-public-orders.serializer';
import { GetPublicUpcomingCompetitionsListResponseDTO } from './dto/public-upcoming-competitions.dto';
import { PublicCompetitionsService } from './public-competitions.service';
import { UpcomingCompetitionSerializer } from './serializers/upcoming-competition.serializer';

@ApiTags('competitions')
@Controller('competitions')
@UseInterceptors(SerializerInterceptor)
@UseGuards(JwtAuthGuard)
export class CompetitionsController {
  constructor(
    private readonly publicCompetitionsService: PublicCompetitionsService,
    private readonly competitionService: CompetitionService,
    private readonly competitionSerializerService: CompetitionSerializer,
    private readonly upcomingCompetitionSerializerService: UpcomingCompetitionSerializer,
    private readonly publicRacesService: PublicRacesService,
    private readonly publicRelaysService: PublicRelaysService,
    private readonly publicCryatlonsService: PublicCryatlonsService,
    private readonly publicAquatlonsService: PublicAquatlonsService,
    private readonly competitionPublicOrdersSerializerService: CompetitionPublicOrdersSerializer,
  ) {}

  @Get(':id')
  @AuthSkip()
  @ApiOperation({ summary: 'Get competition by ID' })
  @ApiParam({ name: 'id', description: 'Competition ID' })
  @ApiResponse({
    status: 200,
    type: GetCompetitionResponseDTO,
    description: 'Successful get competition data response',
  })
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

  @Get('public/upcoming')
  @AuthSkip()
  @ApiOperation({ summary: 'Get upcoming public competitions list' })
  @ApiResponse({
    status: 200,
    type: GetPublicUpcomingCompetitionsListResponseDTO,
    description: 'Successful get public upcoming competitions list',
  })
  async getUpcomingPublicCompetitions(): Promise<GetPublicUpcomingCompetitionsListResponseDTO> {
    const competitions = await this.publicCompetitionsService.findAllUpcoming();

    return {
      data: this.upcomingCompetitionSerializerService.markSerializableCollection(
        competitions,
      ),
    };
  }

  @Get('public/orders/:id')
  @AuthSkip()
  @ApiOperation({ summary: 'Get competition public orders by ID' })
  @ApiParam({ name: 'id', description: 'Competition ID' })
  @ApiResponse({
    status: 200,
    type: GetCompetitionPublicOrdersResponseDTO,
    description: 'Successful get competition public orders data response',
  })
  async getCompetitionPublicOrders(
    @Param() { id }: IdParamDTO,
  ): Promise<GetCompetitionPublicOrdersResponseDTO> {
    const [
      isCompetitionExist,
      competition,
    ] = await this.competitionService.findOne(id);

    if (!isCompetitionExist) {
      throw new NotFoundException('Competition not found');
    }

    const publicAssets = await Promise.all([
      this.publicRacesService.findAll(id),
      this.publicRelaysService.findAll(id),
      this.publicCryatlonsService.findAll(id),
      this.publicAquatlonsService.findAll(id),
    ]);
    const [races, relays, cryatlons, aquatlons] = publicAssets;
    const competitionPublicOrders = new Competition({
      ...competition,
      races,
      relays,
      cryatlons,
      aquatlons,
    });

    return {
      data: this.competitionPublicOrdersSerializerService.markSerializableValue(
        competitionPublicOrders,
      ),
    };
  }
}
