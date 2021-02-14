import { Injectable } from '@nestjs/common';
import { BaseSerializerService } from '@common/serializers/base.serializer';
import { ClubView } from '@models/clubs/entities/club-view.entity';
import { GetClubDataDTO } from '@models/clubs/dto/club.dto';

@Injectable()
export class ClubsSerializerService extends BaseSerializerService<
  ClubView,
  GetClubDataDTO
> {
  public async serialize(clubView: ClubView): Promise<GetClubDataDTO> {
    return {
      id: clubView.id,
      name: clubView.name,
      location: clubView.location,
      members_count: Number(clubView.members_count),
    };
  }
}
