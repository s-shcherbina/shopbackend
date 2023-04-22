import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { OrderEntity } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    private readonly usersService: UsersService,
  ) {}

  async createOrder(userId: number) {
    const user = await this.usersService.findUserById(userId);
    if (!user)
      throw new BadRequestException('Заповніть поля або зареєструйтесь');
    await this.orderRepository.save({ user });
  }

  async getOrders(userId: number, completed: boolean): Promise<OrderEntity[]> {
    if (!userId && completed === undefined) return this.orderRepository.find();

    if (userId && completed !== undefined)
      return this.orderRepository
        .createQueryBuilder('order')
        .where('order.completed = :completed', { completed })
        .andWhere('order.userId = :id', { id: userId })
        .leftJoinAndSelect('order.user', 'user')
        .getMany();

    return this.orderRepository
      .createQueryBuilder('order')
      .where('order.completed = :completed', { completed })
      .orWhere('order.userId = :id', { id: userId })
      .leftJoinAndSelect('order.user', 'user')
      .getMany();
  }

  async getOrder(id: number): Promise<OrderEntity> {
    return await this.orderRepository.findOneBy({ id });
  }

  async updateOrder(id: number, completed: boolean) {
    await this.orderRepository.update({ id }, { completed });
    return 'Оновлено';
  }

  async removeOrder(id: number): Promise<string> {
    await this.orderRepository.delete({ id });
    return 'Видалено';
  }
}
