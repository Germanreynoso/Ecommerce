import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto, ProductIdDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';
import { OrderDetailsService } from 'src/order-details/order-details.service';
import { Order } from './entities/order.entity';
import { CreateOrderDetailDto } from 'src/order-details/dto/create-order-detail.dto';
import { OrderResponseDto } from './dto/response-order.dto';

@Injectable()
export class OrdersService {

  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly userService: UsersService,
    private readonly productService: ProductsService,
    private readonly orderDetailsService: OrderDetailsService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const { userId, products } = createOrderDto;
    const user = await this.userService.findOne(userId);

    if (!user) {
      throw new Error(`User with id ${userId} not found.`);
    }

    const order = this.orderRepository.create({
      user: user,
      date: new Date(),
    });

    const orderEntity = await this.orderRepository.save(order);
    const total = await this.calculateTotal(products);

    const orderDetail = new CreateOrderDetailDto();
    orderDetail.price = total;
    orderDetail.products = products;
    orderDetail.order = orderEntity;

    const orderDetailEntity = await this.orderDetailsService.create(orderDetail);
    return new OrderResponseDto(orderDetailEntity);
  }

  private async calculateTotal(products: Array<ProductIdDto>): Promise<number> {
    let total = 0;
    for (const product of products) {
      total += await this.productService.buyProduct(product.id);
    }
    return total;
  }

  async findAll() {
    return this.orderRepository.find({
      relations: ['user', 'details'],
    });
  }

  async findOne(id: string) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['user', 'details'],
    });

    if (!order) {
      throw new Error(`Order with id ${id} not found.`);
    }

    const orderDetail = await this.orderDetailsService.findOneByOrderId(order.id, ['products', 'order']);
    return orderDetail;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const result = await this.orderRepository.update(id, updateOrderDto);

    if (result.affected === 0) {
      throw new Error(`Order with id ${id} not found.`);
    }

    const updatedOrder = await this.findOne(id);
    return updatedOrder;
  }

  async remove(id: string) {
    const order = await this.findOne(id);

    if (order) {
      await this.orderDetailsService.removeByOrderId(id);
      await this.orderRepository.delete(id);
      return { message: `Order with id ${id} has been removed.` };
    } else {
      throw new Error(`Order with id ${id} not found.`);
    }
  }
}
