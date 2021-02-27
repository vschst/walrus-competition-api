import {
  Controller,
  UseGuards,
  UseInterceptors,
  Get,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SerializerInterceptor } from '@common/interceptors/serializer.interceptor';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { AuthSkip } from '@common/decorators/requests/auth-skip.decorador';
import { IdParamDTO } from '@common/dto/id-param.dto';
import { RacesService } from './races.service';
import { PublicRacesSerializerService } from './serializers/public-races.serializer';
import { GetPublicRaceListResponseDTO } from './dto/public-races.dto';

@ApiTags('races')
@Controller('races')
@UseInterceptors(SerializerInterceptor)
@UseGuards(JwtAuthGuard)
export class RacesController {
  constructor(
    private readonly racesService: RacesService,
    private readonly publicRacesSerializerService: PublicRacesSerializerService,
  ) {}

  @Get('public/:id')
  @AuthSkip()
  async getPublicOrders(
    @Param() { id }: IdParamDTO,
  ): Promise<GetPublicRaceListResponseDTO> {
    const races = await this.racesService.getAllPublic(id);

    return {
      data: this.publicRacesSerializerService.markSerializableCollection(races),
    };
  }
}
