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
import { RelaysService } from './relays.service';
import { PublicRelaysSerializerService } from './serializers/public-relays.serializer';
import { GetPublicRelayListResponseDTO } from './dto/public-relays.dto';

@ApiTags('relays')
@Controller('relays')
@UseInterceptors(SerializerInterceptor)
@UseGuards(JwtAuthGuard)
export class RelaysController {
  constructor(
    private readonly relaysService: RelaysService,
    private readonly publicRelaysSerializerService: PublicRelaysSerializerService,
  ) {}

  @Get('public/:id')
  @AuthSkip()
  async getPublicOrders(
    @Param() { id }: IdParamDTO,
  ): Promise<GetPublicRelayListResponseDTO> {
    const relays = await this.relaysService.getAllPublic(id);

    return {
      data: this.publicRelaysSerializerService.markSerializableCollection(
        relays,
      ),
    };
  }
}
