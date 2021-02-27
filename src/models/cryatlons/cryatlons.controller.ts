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
import { CryatlonsService } from './cryatlons.service';
import { PublicCryatlonsSerializerService } from './serializers/public-cryatlons.serializer';
import { GetPublicCryatlonListResponseDTO } from './dto/public-cryatlons.dto';

@ApiTags('cryatlons')
@Controller('cryatlons')
@UseInterceptors(SerializerInterceptor)
@UseGuards(JwtAuthGuard)
export class CryatlonsController {
  constructor(
    private readonly cryatlonsService: CryatlonsService,
    private readonly publicCryatlonsSerializerService: PublicCryatlonsSerializerService,
  ) {}

  @Get('public/:id')
  @AuthSkip()
  async getPublicCryatlons(
    @Param() { id }: IdParamDTO,
  ): Promise<GetPublicCryatlonListResponseDTO> {
    const cryatlons = await this.cryatlonsService.getAllPublic(id);

    return {
      data: this.publicCryatlonsSerializerService.markSerializableCollection(
        cryatlons,
      ),
    };
  }
}
