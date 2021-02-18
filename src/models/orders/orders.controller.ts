import {
  Body,
  Controller,
  HttpCode,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDTO } from './dto/create-order.dto';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: 'Create new order' })
  @HttpCode(200)
  async createOrder(
    @Body()
    {
      competition_id,
      first_name,
      last_name,
      middle_name,
      birthdate,
      gender,
      para_swimmer,
      club_name,
      location,
      email,
      phone,
      races,
      relays,
      cryatlon_id,
      additional,
    }: CreateOrderDTO,
  ): Promise<void> {
    const [isOrderCreated] = await this.orderService.createOrder(
      competition_id,
      first_name,
      last_name,
      middle_name,
      birthdate,
      gender,
      para_swimmer,
      club_name,
      location,
      email,
      phone,
      races,
      relays,
      cryatlon_id,
      additional,
    );

    if (!isOrderCreated) {
      throw new InternalServerErrorException('Could not create order');
    }
  }
}
