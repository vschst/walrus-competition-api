import { Injectable } from '@nestjs/common';
import { BaseSerializerService } from '@common/serializers/base.serializer';
import { ClubView } from '@models/clubs/entities/club.view.entity';
import { GetClubsListItem } from '@models/clubs/dto/clubs.dto';

@Injectable()
export class ClubsSerializerService extends BaseSerializerService<
  ClubView,
  GetClubsListItem
> {
  public async serialize(clubView: ClubView): Promise<GetClubsListItem> {
    return {
      id: clubView.id,
      name: clubView.name,
      location: clubView.location,
      members_count: Number(clubView.members_count),
    };
  }
}
