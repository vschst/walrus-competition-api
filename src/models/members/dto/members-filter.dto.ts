import { IsOptional, IsInt, IsIn, IsEnum, Min, Max } from 'class-validator';
import { BaseFilterDTO } from '@common/dto/base-filter.dto';
import { Transform } from 'class-transformer';
import { Gender } from '@common/enums/gender.enum';

export class GetMembersFilterDTO extends BaseFilterDTO {
  @IsOptional()
  @IsIn(['last_name', 'club_name', 'birthdate'])
  sort = 'last_name';

  @IsOptional()
  @Transform(({ value: id }) => parseInt(id))
  @IsInt()
  club_id: number;

  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;

  @IsOptional()
  @Transform(({ value: min }) => parseInt(min))
  @IsInt()
  @Min(0)
  @Max(99)
  min_age: number;

  @IsOptional()
  @Transform(({ value: max }) => parseInt(max))
  @IsInt()
  @Min(1)
  @Max(100)
  max_age: number;
}
