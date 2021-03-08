import {
  Controller,
  UseGuards,
  UseInterceptors,
  Get,
  Param,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SerializerInterceptor } from '@common/interceptors/serializer.interceptor';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { AuthSkip } from '@common/decorators/requests/auth-skip.decorador';
import { IdParamDTO } from '@common/dto/id-param.dto';
import { PublicRacesService } from './public-races.service';
import { PublicRacesSerializerService } from './serializers/public-races.serializer';
import { GetPublicRaceListResponseDTO } from './dto/public-races.dto';

@ApiTags('races')
@Controller('races')
@UseInterceptors(SerializerInterceptor)
@UseGuards(JwtAuthGuard)
export class RacesController {
  constructor(
    private readonly publicRacesService: PublicRacesService,
    private readonly publicRacesSerializerService: PublicRacesSerializerService,
  ) {}

  @ApiOperation({ summary: 'Get public races and orders for them' })
  @ApiParam({ name: 'id', description: 'Competition ID' })
  @ApiResponse({
    status: 200,
    type: GetPublicRaceListResponseDTO,
    description: 'Successful get public races and orders for them response',
  })
  @Get('public/:id')
  @AuthSkip()
  async getPublicOrders(
    @Param() { id }: IdParamDTO,
  ): Promise<GetPublicRaceListResponseDTO> {
    const races = await this.publicRacesService.findAll(id);

    return {
      data: this.publicRacesSerializerService.markSerializableCollection(races),
    };
  }
}
