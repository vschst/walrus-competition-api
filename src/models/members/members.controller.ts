import {
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
  Body,
  InternalServerErrorException,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { MembersService } from './members.service';
import { GetMembersFilterDTO } from './dto/members-filter.dto';
import { GetMembersListResponseDTO } from '@models/members/dto/members.dto';
import { MemberSerializerService } from './serializers/member.serializer';
import { MembersSerializerService } from './serializers/members.serializer';
import { SerializerInterceptor } from '@common/interceptors/serializer.interceptor';
import { CreateMemberRequestDTO } from '@models/members/dto/create-member.dto';
import { GetMemberResponseDTO } from './dto/member.dto';

@ApiTags('members')
@ApiBearerAuth()
@Controller('members')
@UseInterceptors(SerializerInterceptor)
@UseGuards(JwtAuthGuard)
export class MembersController {
  constructor(
    private readonly membersService: MembersService,
    private readonly memberSerializerService: MemberSerializerService,
    private readonly membersSerializerService: MembersSerializerService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Add a new member' })
  @HttpCode(200)
  async createMember(
    @Body()
    {
      first_name,
      last_name,
      middle_name,
      birthdate,
      gender,
      club_id,
      email,
      phone,
    }: CreateMemberRequestDTO,
  ): Promise<GetMemberResponseDTO> {
    const [isMemberCreated, member] = await this.membersService.createMember(
      first_name,
      last_name,
      middle_name,
      birthdate,
      gender,
      club_id,
      email,
      phone,
    );

    if (!isMemberCreated) {
      throw new InternalServerErrorException('Could not create member');
    }

    return {
      data: this.memberSerializerService.markSerializableValue(member),
    };
  }

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
