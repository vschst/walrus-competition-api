import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ClubsService } from './clubs.service';
import { ClubSerializerService } from './serializers/club.serializer';
import { IdParamDTO } from '@common/dto/id.param.dto';
import { GetClubResponseDTO } from './dto/club.dto';

@ApiTags('clubs')
@Controller('clubs')
export class ClubsController {
  constructor(
    private readonly clubsService: ClubsService,
    private readonly clubSerializerService: ClubSerializerService
  ) {}

  @Get(':id')
  async getClub(@Param('id') { id }: IdParamDTO): Promise<GetClubResponseDTO> {
    const club = await this.clubsService.findOne(id);

    return {
      data: this.clubSerializerService.markSerializableValue(club),
    };
  }
}
