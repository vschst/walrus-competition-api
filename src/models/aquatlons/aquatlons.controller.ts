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
import { PublicAquatlonsService } from './public-aquatlons.service';
import { PublicAquatlonsSerializerService } from './serializers/public-aquatlons.serializer';
import { GetPublicAquatlonListResponseDTO } from './dto/public-aquatlons.dto';

@ApiTags('aquatlons')
@Controller('aquatlons')
@UseInterceptors(SerializerInterceptor)
@UseGuards(JwtAuthGuard)
export class AquatlonsController {
  constructor(
    private readonly publicAquatlonsService: PublicAquatlonsService,
    private readonly publicAquatlonsSerializerService: PublicAquatlonsSerializerService,
  ) {}

  @ApiOperation({ summary: 'Get public aquatlons and orders for them' })
  @ApiParam({ name: 'id', description: 'Competition ID' })
  @ApiResponse({
    status: 200,
    type: GetPublicAquatlonListResponseDTO,
    description: 'Successful get public aquatlons and orders for them response',
  })
  @Get('public/:id')
  @AuthSkip()
  async getPublicAquatlons(
    @Param() { id }: IdParamDTO,
  ): Promise<GetPublicAquatlonListResponseDTO> {
    const aquatlons = await this.publicAquatlonsService.findAll(id);

    return {
      data: this.publicAquatlonsSerializerService.markSerializableCollection(
        aquatlons,
      ),
    };
  }
}
