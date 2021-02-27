import {
  Body,
  Controller,
  HttpCode,
  InternalServerErrorException,
  Post,
  Get,
  UseGuards,
  ValidationPipe,
  Query,
  UseInterceptors,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dto/create-order.dto';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { AuthSkip } from '@common/decorators/requests/auth-skip.decorador';
import { GetOrdersFilterDTO } from './dto/orders-filter.dto';
import { OrderSerializerService } from './serializers/order.serializer';
import { OrdersSerializerService } from './serializers/orders.serializer';
import { PublicOrdersSerializerService } from './serializers/public-orders.serializer';
import { GetOrdersListResponseDTO } from './dto/orders.dto';
import { SerializerInterceptor } from '@common/interceptors/serializer.interceptor';
import { IdParamDTO } from '@common/dto/id-param.dto';
import { GetOrderResponseDTO } from './dto/order.dto';
import { GetPublicOrdersListResponseDTO } from './dto/public-orders.dto';

@ApiTags('orders')
@Controller('orders')
@UseInterceptors(SerializerInterceptor)
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(
    private readonly orderService: OrderService,
    private readonly ordersService: OrdersService,
    private readonly orderSerializerService: OrderSerializerService,
    private readonly ordersSerializerService: OrdersSerializerService,
    private readonly publicOrdersSerializerService: PublicOrdersSerializerService,
  ) {}

  @Post()
  @AuthSkip()
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
      need_skis,
      races,
      relays,
      cryatlons,
      additional,
    }: CreateOrderDTO,
  ): Promise<GetOrderResponseDTO> {
    const [
      isOrderCreated,
      errorType,
      order,
    ] = await this.orderService.createOrder(
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
      need_skis,
      races,
      relays,
      cryatlons,
      additional,
    );

    if (!isOrderCreated) {
      switch (errorType) {
        case 'competition_not_found':
          throw new InternalServerErrorException('Competition not found');
        case 'no_distances':
          throw new InternalServerErrorException('Distances are not specified');
        default:
          throw new InternalServerErrorException('Could not create order');
      }
    }

    return {
      data: this.orderSerializerService.markSerializableValue(order),
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get orders list' })
  async getOrders(
    @Query(ValidationPipe)
    {
      limit,
      offset,
      sort,
      direction,
      competition_id,
      gender,
      para_swimmer,
      status,
      search,
    }: GetOrdersFilterDTO,
  ): Promise<GetOrdersListResponseDTO> {
    const [orders, total] = await this.ordersService.findAll(
      limit,
      offset,
      sort,
      direction,
      competition_id,
      gender,
      para_swimmer,
      status,
      search,
    );

    return {
      data: this.ordersSerializerService.markSerializableCollection(orders),
      total,
      limit,
      offset,
    };
  }

  @Get('public/:id')
  @AuthSkip()
  @ApiOperation({ summary: 'Get competition public orders list' })
  @ApiParam({ name: 'id', description: 'Competition ID' })
  async getCompetitionPublicOrders(
    @Param() { id }: IdParamDTO,
  ): Promise<GetPublicOrdersListResponseDTO> {
    const orders = await this.ordersService.findAllPublic(id);

    return {
      data: this.publicOrdersSerializerService.markSerializableCollection(
        orders,
      ),
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get order by ID' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  async getOrder(@Param() { id }: IdParamDTO): Promise<GetOrderResponseDTO> {
    const [isOrderExist, order] = await this.orderService.findOne(id, true);

    if (!isOrderExist) {
      throw new NotFoundException('Order not found');
    }

    return {
      data: this.orderSerializerService.markSerializableValue(order),
    };
  }
}
