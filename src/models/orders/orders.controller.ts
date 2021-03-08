import {
  Body,
  Controller,
  HttpCode,
  InternalServerErrorException,
  Post,
  Get,
  Patch,
  UseGuards,
  ValidationPipe,
  Query,
  UseInterceptors,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
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
import { PublicOrdersService } from './public-orders.service';
import { UpdateOrderDTO } from './dto/update-order.dto';

@ApiTags('orders')
@Controller('orders')
@UseInterceptors(SerializerInterceptor)
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(
    private readonly orderService: OrderService,
    private readonly publicOrdersService: PublicOrdersService,
    private readonly ordersService: OrdersService,
    private readonly orderSerializerService: OrderSerializerService,
    private readonly ordersSerializerService: OrdersSerializerService,
    private readonly publicOrdersSerializerService: PublicOrdersSerializerService,
  ) {}

  @Post()
  @AuthSkip()
  @ApiOperation({ summary: 'Create new order' })
  @ApiResponse({
    status: 200,
    type: GetOrderResponseDTO,
    description: 'Successful create order response',
  })
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
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get orders list' })
  @ApiResponse({
    status: 200,
    type: GetOrdersListResponseDTO,
    description: 'Successful get order list response',
  })
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
  @ApiResponse({
    status: 200,
    type: GetPublicOrdersListResponseDTO,
    description: 'Successful get public order list response',
  })
  async getCompetitionPublicOrders(
    @Param() { id }: IdParamDTO,
  ): Promise<GetPublicOrdersListResponseDTO> {
    const orders = await this.publicOrdersService.findAll(id);

    return {
      data: this.publicOrdersSerializerService.markSerializableCollection(
        orders,
      ),
    };
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get order by ID' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiResponse({
    status: 200,
    type: GetOrderResponseDTO,
    description: 'Successful get order data response',
  })
  async getOrder(@Param() { id }: IdParamDTO): Promise<GetOrderResponseDTO> {
    const [isOrderExist, order] = await this.orderService.findOne(id, true);

    if (!isOrderExist) {
      throw new NotFoundException('Order not found');
    }

    return {
      data: this.orderSerializerService.markSerializableValue(order),
    };
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update order data' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiResponse({
    status: 200,
    type: GetOrderResponseDTO,
    description: 'Successful update order response',
  })
  async updateOrder(
    @Param() { id }: IdParamDTO,
    @Body() updateOrder: UpdateOrderDTO,
  ): Promise<GetOrderResponseDTO> {
    const [
      isOrderUpdated,
      errorType,
      order,
    ] = await this.orderService.updateOrder(id, updateOrder);

    if (!isOrderUpdated) {
      switch (errorType) {
        case 'order_not_found':
          throw new InternalServerErrorException('Order not found');
        default:
          throw new InternalServerErrorException('Could not update order');
      }
    }

    return {
      data: this.orderSerializerService.markSerializableValue(order),
    };
  }
}
