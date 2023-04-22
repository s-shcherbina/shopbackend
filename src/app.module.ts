import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { connectionDB } from './db/typeorm.config';
import { TokensModule } from './modules/tokens/tokens.module';
import { UsersModule } from './modules/users/users.module';
import { GroupsModule } from './modules/groups/groups.module';
import { SubGroupsModule } from './modules/sub-groups/sub-groups.module';
import { GoodsModule } from './modules/goods/goods.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ImagesModule } from './modules/images/images.module';
import { OrderGoodsModule } from './modules/order-goods/order-goods.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { GalleryModule } from './modules/gallery/gallery.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...connectionDB,
      autoLoadEntities: true,
    }),
    MulterModule.register({
      dest: './uploads',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    UsersModule,
    TokensModule,
    AuthModule,
    GroupsModule,
    SubGroupsModule,
    GoodsModule,
    OrdersModule,
    OrderGoodsModule,
    ImagesModule,
    GalleryModule,
  ],
})
export class AppModule {}
