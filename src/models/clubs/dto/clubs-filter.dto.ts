import { IsOptional, IsIn } from 'class-validator';
import { BaseFilterDto } from '@common/dto/base-filter.dto';

export class GetClubsFilterDTO extends BaseFilterDto {
  @IsOptional()
  @IsIn(['name', 'location', 'members_count'])
  sort = 'members_count';
}
