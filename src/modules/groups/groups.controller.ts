import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorators';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/types';
import { CreateGroupDTO } from './dto';
import { GroupEntity } from './entities/group.entity';
import { GroupsService } from './groups.service';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  createGroup(@Body() dto: CreateGroupDTO): Promise<void> {
    return this.groupsService.createGroup(dto.name);
  }

  @Get()
  getGroups(): Promise<GroupEntity[]> {
    return this.groupsService.getGroups();
  }

  @Get(':id')
  getGroup(@Param('id') id: number): Promise<GroupEntity> {
    return this.groupsService.getGroup(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  updateGroup(
    @Body() dto: CreateGroupDTO,
    @Param('id') id: number,
  ): Promise<string> {
    return this.groupsService.updateGroup(id, dto.name);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  removeGroup(@Param('id') id: number): Promise<string> {
    return this.groupsService.removeGroup(id);
  }
}
