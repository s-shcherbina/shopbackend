import { OrderGoodEntity } from 'src/modules/order-goods/entities/order-good.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'orders' })
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: false })
  completed: boolean;

  @OneToMany(() => OrderGoodEntity, (orderGoods) => orderGoods.order)
  orderGoods: OrderGoodEntity[];

  @ManyToOne(() => UserEntity, (user) => user.order, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;
}
