import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { OrderStatuses } from '@models/orders/enums/order-statuses.enum';

export class UpdateOrderDTO {
  @ApiProperty({ required: false, enum: OrderStatuses })
  @IsOptional()
  @IsEnum(OrderStatuses)
  status: OrderStatuses;
}
