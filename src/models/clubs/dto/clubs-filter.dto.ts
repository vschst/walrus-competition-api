import { IsOptional, IsIn } from 'class-validator';
import { BaseFilterDTO } from '@common/dto/base-filter.dto';

export class GetClubsFilterDTO extends BaseFilterDTO {
  @IsOptional()
  @IsIn(['name', 'location', 'members_count'])
  sort = 'members_count';
}
