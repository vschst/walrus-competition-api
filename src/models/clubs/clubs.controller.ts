import {
  Controller,
  Get,
  Param,
  Query,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiParam, ApiOperation } from '@nestjs/swagger';
import { ClubsService } from './clubs.service';
import { ClubSerializerService } from './serializers/club.serializer';
import { ClubsSerializerService } from './serializers/clubs.serializer';
import { IdParamDTO } from '@common/dto/id.param.dto';
import { GetClubResponseDTO } from './dto/club.dto';
import { GetClubsListResponseDTO } from './dto/clubs.dto';
import { SerializerInterceptor } from '@common/interceptors/serializer.interceptor';
import { GetClubsFilterDTO } from '@models/clubs/dto/clubs.filter.dto';

@ApiTags('clubs')
@Controller('clubs')
@UseInterceptors(SerializerInterceptor)
export class ClubsController {
  constructor(
    private readonly clubsService: ClubsService,
    private readonly clubSerializerService: ClubSerializerService,
    private readonly clubsSerializerService: ClubsSerializerService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get clubs list' })
  async getClubs(
    @Query(ValidationPipe)
    { limit, offset, sort, direction, search }: GetClubsFilterDTO,
  ): Promise<GetClubsListResponseDTO> {
    const [clubs, total] = await this.clubsService.findAll(
      limit,
      offset,
      sort,
      direction,
      search,
    );

    return {
      data: this.clubsSerializerService.markSerializableCollection(clubs),
      total,
      limit,
      offset,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get club by ID' })
  @ApiParam({ name: 'id', description: 'Club ID' })
  async getClub(@Param() { id }: IdParamDTO): Promise<GetClubResponseDTO> {
    const club = await this.clubsService.findOne(id);

    return {
      data: this.clubSerializerService.markSerializableValue(club),
    };
  }
}
