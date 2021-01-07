import { IsOptional, IsInt, IsIn, IsEnum } from 'class-validator';
import { BaseFilterDto } from '@common/dto/base-filter.dto';
import { Transform } from 'class-transformer';
import { Gender } from '@common/enums/gender.enum';

export class GetMembersFilterDTO extends BaseFilterDto {
  @IsOptional()
  @IsIn(['last_name', 'club_name', 'birthdate'])
  sort = 'last_name';

  @IsOptional()
  @Transform((id) => parseInt(id))
  @IsInt()
  club_id: number;

  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;
}
