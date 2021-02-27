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
import { PublicRelaysService } from './public-relays.service';
import { PublicRelaysSerializerService } from './serializers/public-relays.serializer';
import { GetPublicRelayListResponseDTO } from './dto/public-relays.dto';

@ApiTags('relays')
@Controller('relays')
@UseInterceptors(SerializerInterceptor)
@UseGuards(JwtAuthGuard)
export class RelaysController {
  constructor(
    private readonly publicRelaysService: PublicRelaysService,
    private readonly publicRelaysSerializerService: PublicRelaysSerializerService,
  ) {}

  @ApiOperation({ summary: 'Get public relays and orders for them' })
  @ApiParam({ name: 'id', description: 'Competition ID' })
  @ApiResponse({
    status: 200,
    type: GetPublicRelayListResponseDTO,
    description: 'Successful get public relays and orders for them response',
  })
  @Get('public/:id')
  @AuthSkip()
  async getPublicOrders(
    @Param() { id }: IdParamDTO,
  ): Promise<GetPublicRelayListResponseDTO> {
    const relays = await this.publicRelaysService.findAll(id);

    return {
      data: this.publicRelaysSerializerService.markSerializableCollection(
        relays,
      ),
    };
  }
}
