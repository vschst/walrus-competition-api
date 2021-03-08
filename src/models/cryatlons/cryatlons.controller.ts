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
import { PublicCryatlonsService } from './public-cryatlons.service';
import { PublicCryatlonsSerializerService } from './serializers/public-cryatlons.serializer';
import { GetPublicCryatlonListResponseDTO } from './dto/public-cryatlons.dto';

@ApiTags('cryatlons')
@Controller('cryatlons')
@UseInterceptors(SerializerInterceptor)
@UseGuards(JwtAuthGuard)
export class CryatlonsController {
  constructor(
    private readonly publicCryatlonsService: PublicCryatlonsService,
    private readonly publicCryatlonsSerializerService: PublicCryatlonsSerializerService,
  ) {}

  @ApiOperation({ summary: 'Get public cryatlons and orders for them' })
  @ApiParam({ name: 'id', description: 'Competition ID' })
  @ApiResponse({
    status: 200,
    type: GetPublicCryatlonListResponseDTO,
    description: 'Successful get public cryatlons and orders for them response',
  })
  @Get('public/:id')
  @AuthSkip()
  async getPublicCryatlons(
    @Param() { id }: IdParamDTO,
  ): Promise<GetPublicCryatlonListResponseDTO> {
    const cryatlons = await this.publicCryatlonsService.findAll(id);

    return {
      data: this.publicCryatlonsSerializerService.markSerializableCollection(
        cryatlons,
      ),
    };
  }
}
