import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodsModule } from '../goods/goods.module';
import { GroupEntity } from '../groups/entities/group.entity';
import { SubGroupEntity } from './entities/sub-group.entity';
import { SubGroupsController } from './sub-groups.controller';
import { SubGroupsService } from './sub-groups.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubGroupEntity, GroupEntity]),
    GoodsModule,
  ],
  controllers: [SubGroupsController],
  providers: [SubGroupsService],
  exports: [SubGroupsService],
})
export class SubGroupsModule {}
