import { Injectable } from '@nestjs/common';
import { BaseSerializerService } from '@common/serializers/base.serializer';
import { ClubView } from '@models/clubs/entities/club-view.entity';
import { GetClubsListItemDTO } from '@models/clubs/dto/clubs.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ClubsSerializerService extends BaseSerializerService<
  ClubView,
  GetClubsListItemDTO
> {
  public async serialize(clubView: ClubView): Promise<GetClubsListItemDTO> {
    return plainToClass(GetClubsListItemDTO, clubView);
  }
}
