import { Injectable } from '@nestjs/common';
import { BaseSerializerService } from '@common/serializers/responses/base.serializer';
import { Club } from '@models/clubs/entities/club.entity';
import { GetClubDataDTO } from '@models/clubs/dto/club.dto';

@Injectable()
export class ClubSerializerService extends BaseSerializerService<
  Club,
  GetClubDataDTO
> {
  public async serialize(club: Club): Promise<GetClubDataDTO> {
    return {
      id: club.id,
      name: club.name,
      location: club.location,
    };
  }
}
