import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiParam, ApiOperation } from '@nestjs/swagger';
import { ClubsService } from './clubs.service';
import { ClubSerializerService } from './serializers/club.serializer';
import { IdParamDTO } from '@common/dto/id.param.dto';
import { GetClubResponseDTO } from './dto/club.dto';
import { SerializerInterceptor } from '@common/interceptors/serializer.interceptor';

@ApiTags('clubs')
@Controller('clubs')
@UseInterceptors(SerializerInterceptor)
export class ClubsController {
  constructor(
    private readonly clubsService: ClubsService,
    private readonly clubSerializerService: ClubSerializerService,
  ) {}

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
