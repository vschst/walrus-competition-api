import { Injectable } from '@nestjs/common';
import { BaseSerializerService } from '@common/serializers/base.serializer';
import { Club } from '@models/clubs/entities/club.entity';
import { GetClubDataDTO } from '@models/clubs/dto/club.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ClubSerializerService extends BaseSerializerService<
  Club,
  GetClubDataDTO
> {
  public async serialize(club: Club): Promise<GetClubDataDTO> {
    return plainToClass(GetClubDataDTO, club);
  }
}
