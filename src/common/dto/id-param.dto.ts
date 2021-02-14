import { IsInt } from 'class-validator';
import { Transform } from 'class-transformer';

export class IdParamDTO {
  @Transform(({ value: id }) => parseInt(id))
  @IsInt()
  id: number;
}
