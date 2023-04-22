import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorators';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/types';
import { CreateGoodDTO } from './dto';
import { GoodEntity } from './entities/good.entity';
import { GoodsService } from './goods.service';

@Controller('goods')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  createGood(@Body() dto: CreateGoodDTO) {
    return this.goodsService.createGood(dto);
  }

  @Get()
  getGoods(@Query('subGroupId') subGroupId: number): Promise<GoodEntity[]> {
    return this.goodsService.getGoods(subGroupId);
  }

  @Get(':id')
  getGood(@Param('id') id: number): Promise<GoodEntity> {
    return this.goodsService.getGood(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  updateGood(
    @Body() dto: Omit<CreateGoodDTO, 'subGroupId'>,
    @Param('id') id: number,
  ): Promise<string> {
    return this.goodsService.updateGood(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  removeGood(@Param('id') id: number): Promise<string> {
    return this.goodsService.removeGood(id);
  }
}
