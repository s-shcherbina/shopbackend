import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesModule } from '../images/images.module';
import { SubGroupEntity } from '../sub-groups/entities/sub-group.entity';
import { GoodEntity } from './entities/good.entity';
import { GoodsController } from './goods.controller';
import { GoodsService } from './goods.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([GoodEntity, SubGroupEntity]),
    ImagesModule,
  ],
  controllers: [GoodsController],
  providers: [GoodsService],
  exports: [GoodsService],
})
export class GoodsModule {}
