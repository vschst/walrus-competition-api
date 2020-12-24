import { IsIn, IsInt, IsOptional, IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';

export class BaseFilterDTO {
  @IsOptional()
  @Transform((limit) => parseInt(limit))
  @IsInt()
  limit = 10;

  @IsOptional()
  @Transform((offset) => parseInt(offset))
  @IsInt()
  offset = 0;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  direction = 'asc';

  @IsOptional()
  @Length(3)
  @IsString()
  search: string;
}
