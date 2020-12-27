import { IsOptional, IsInt, IsIn } from 'class-validator';
import { BaseFilterDTO } from '@common/dto/base.filter.dto';
import { Transform } from 'class-transformer';

export class GetMembersFilterDTO extends BaseFilterDTO {
  @IsOptional()
  @IsIn(['first_name', 'last_name', 'middle_name', 'club_name'])
  sort = 'first_name';

  @IsOptional()
  @Transform((id) => parseInt(id))
  @IsInt()
  club_id: number;
}
