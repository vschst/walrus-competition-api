import { IsOptional, IsInt, IsIn } from 'class-validator';
import { BaseFilterDto } from '@common/dto/base-filter.dto';
import { Transform } from 'class-transformer';

export class GetMembersFilterDTO extends BaseFilterDto {
  @IsOptional()
  @IsIn(['last_name', 'club_name', 'birthdate'])
  sort = 'last_name';

  @IsOptional()
  @Transform((id) => parseInt(id))
  @IsInt()
  club_id: number;
}
