import { IsInt } from 'class-validator';
import { Transform } from 'class-transformer';

export class IdParamDto {
  @Transform((id) => parseInt(id))
  @IsInt()
  id: number;
}
