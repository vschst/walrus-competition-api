import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
  NotFoundException,
  InternalServerErrorException,
  HttpCode,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiParam,
  ApiOperation,
} from '@nestjs/swagger';
import { ClubService } from './club.service';
import { ClubsService } from './clubs.service';
import { ClubSerializerService } from './serializers/club.serializer';
import { ClubsSerializerService } from './serializers/clubs.serializer';
import { IdParamDTO } from '@common/dto/id-param.dto';
import { GetClubResponseDTO } from './dto/club.dto';
import { GetClubsListResponseDTO } from './dto/clubs.dto';
import { SerializerInterceptor } from '@common/interceptors/serializer.interceptor';
import { GetClubsFilterDTO } from '@models/clubs/dto/clubs-filter.dto';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { CreateClubRequestDTO } from './dto/create-club.dto';

@ApiTags('clubs')
@ApiBearerAuth()
@Controller('clubs')
@UseInterceptors(SerializerInterceptor)
@UseGuards(JwtAuthGuard)
export class ClubsController {
  constructor(
    private readonly clubService: ClubService,
    private readonly clubsService: ClubsService,
    private readonly clubSerializerService: ClubSerializerService,
    private readonly clubsSerializerService: ClubsSerializerService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Add a new club' })
  @HttpCode(200)
  async createClub(
    @Body() { name, location }: CreateClubRequestDTO,
  ): Promise<GetClubResponseDTO> {
    const [isClubCreated, club] = await this.clubService.createClub(
      name,
      location,
    );

    if (!isClubCreated) {
      throw new InternalServerErrorException('Could not create club');
    }

    return {
      data: this.clubSerializerService.markSerializableValue(club),
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get clubs list' })
  async getClubs(
    @Query(ValidationPipe)
    { limit, offset, sort, direction, search }: GetClubsFilterDTO,
  ): Promise<GetClubsListResponseDTO> {
    const [clubs, total] = await this.clubsService.findAll(
      limit,
      offset,
      sort,
      direction,
      search,
    );

    return {
      data: this.clubsSerializerService.markSerializableCollection(clubs),
      total,
      limit,
      offset,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get club by ID' })
  @ApiParam({ name: 'id', description: 'Club ID' })
  async getClub(@Param() { id }: IdParamDTO): Promise<GetClubResponseDTO> {
    const [isClubExists, club] = await this.clubService.findOne(id, true);

    if (!isClubExists) {
      throw new NotFoundException('Club not found');
    }

    return {
      data: this.clubSerializerService.markSerializableValue(club),
    };
  }
}
