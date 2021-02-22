import { IsOptional, IsIn, IsEnum, IsBoolean, IsInt } from 'class-validator';
import { BaseFilterDTO } from '@common/dto/base-filter.dto';
import { Gender } from '@common/enums/gender.enum';
import { OrderStatuses } from '@models/orders/enums/order-statuses.enum';
import { Transform } from 'class-transformer';

export class GetOrdersFilterDTO extends BaseFilterDTO {
  @IsOptional()
  @IsIn([
    'last_name',
    'gender',
    'birthdate',
    'para_swimmer',
    'club_name',
    'location',
    'status',
    'created_at',
    'races_count',
    'relays_count',
    'cryatlons_count',
  ])
  sort = 'created_at';

  @IsOptional()
  @Transform(({ value: id }) => parseInt(id))
  @IsInt()
  competition_id: number;

  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;

  @IsOptional()
  @IsBoolean()
  para_swimmer: boolean;

  @IsOptional()
  @IsEnum(OrderStatuses)
  status: OrderStatuses;
}
