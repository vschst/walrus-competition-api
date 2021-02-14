import { IsIn, IsInt, IsOptional, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class BaseFilterDTO {
  @IsOptional()
  @Transform(({ value: limit }) => parseInt(limit))
  @IsInt()
  limit = 10;

  @IsOptional()
  @Transform(({ value: offset }) => parseInt(offset))
  @IsInt()
  offset = 0;

  @IsOptional()
  @IsIn(['asc', 'desc'])
  direction = 'asc';

  @IsOptional()
  @MinLength(3)
  @IsString()
  search: string;
}
