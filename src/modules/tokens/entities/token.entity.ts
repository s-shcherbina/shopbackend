import { UserEntity } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'tokens' })
export class TokenEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  refreshToken: string;

  @OneToOne(() => UserEntity, (user) => user.token, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;
}
