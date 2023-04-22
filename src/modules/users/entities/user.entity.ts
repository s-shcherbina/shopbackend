import { OrderEntity } from 'src/modules/orders/entities/order.entity';
import { TokenEntity } from 'src/modules/tokens/entities/token.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  phone: string;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  lastName: string;

  @Column({ nullable: false })
  delivery: string;

  @Column({ nullable: false })
  locality: string;

  @Column({ nullable: false })
  department: string;

  @Column({ nullable: false, default: 'USER' })
  role: string;

  @Column({ default: '' })
  email: string;

  @Column({ default: '' })
  password: string;

  @OneToOne(() => TokenEntity, (token) => token.user)
  token: TokenEntity;

  @OneToMany(() => OrderEntity, (order) => order.user)
  order: OrderEntity[];

  @CreateDateColumn()
  createdAt: Date;
}
