import {
  Controller,
  Get,
  Query,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiParam,
  ApiOperation,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@common/guards/jwt.auth.guard';
import { MembersService } from './members.service';
import { GetMembersFilterDTO } from './dto/members.filter.dto';
import { GetMembersListResponseDTO } from '@models/members/dto/members.dto';
import { MembersSerializerService } from './serializers/members.serializer';
import { SerializerInterceptor } from '@common/interceptors/serializer.interceptor';

@ApiTags('members')
@ApiBearerAuth()
@Controller('members')
@UseInterceptors(SerializerInterceptor)
@UseGuards(JwtAuthGuard)
export class MembersController {
  constructor(
    private readonly membersService: MembersService,
    private readonly membersSerializerService: MembersSerializerService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get members list' })
  async getMembers(
    @Query(ValidationPipe)
    { limit, offset, sort, direction, club_id, search }: GetMembersFilterDTO,
  ): Promise<GetMembersListResponseDTO> {
    const [members, total] = await this.membersService.findAll(
      limit,
      offset,
      sort,
      direction,
      club_id,
      search,
    );

    return {
      data: this.membersSerializerService.markSerializableCollection(members),
      total,
      limit,
      offset,
    };
  }
}
