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
import { CreateGroupDTO } from '../groups/dto';
import { CreateSubGroupDTO } from './dto';
import { SubGroupEntity } from './entities/sub-group.entity';
import { SubGroupsService } from './sub-groups.service';

@Controller('sub_groups')
export class SubGroupsController {
  constructor(private readonly subGroupsService: SubGroupsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  createSubGroup(@Body() dto: CreateSubGroupDTO) {
    return this.subGroupsService.createSubGroup(dto);
  }

  @Get()
  getSubGroups(@Query('groupId') groupId: number): Promise<SubGroupEntity[]> {
    return this.subGroupsService.getSubGroups(groupId);
  }

  @Get(':id')
  getSubGroup(@Param('id') id: number): Promise<SubGroupEntity> {
    return this.subGroupsService.getSubGroup(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  updateSubGroup(
    @Body() dto: CreateGroupDTO,
    @Param('id') id: number,
  ): Promise<string> {
    return this.subGroupsService.updateSubGroup(id, dto.name);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  removeSubGroup(@Param('id') id: number): Promise<string> {
    return this.subGroupsService.removeSubGroup(id);
  }
}
