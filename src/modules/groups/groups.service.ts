import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubGroupsService } from '../sub-groups/sub-groups.service';
import { GroupEntity } from './entities/group.entity';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>,
    private readonly subgroupsService: SubGroupsService,
  ) {}

  async createGroup(name: string) {
    const existGroup = await this.groupRepository.findOneBy({ name });
    if (existGroup) throw new BadRequestException('Така група вже існує');
    await this.groupRepository.save({ name });
  }

  async getGroups(): Promise<GroupEntity[]> {
    return await this.groupRepository.find();
  }

  async getGroup(id: number): Promise<GroupEntity> {
    return await this.groupRepository.findOneBy({ id });
  }

  async updateGroup(id: number, name: string): Promise<string> {
    const existGroup = await this.groupRepository.findOneBy({ name });
    if (existGroup && existGroup.id == id)
      throw new BadRequestException('Не змінили назву');

    if (existGroup && existGroup.id != id)
      throw new BadRequestException('Така група вже існує');

    await this.groupRepository.update({ id }, { name });
    return 'Оновлено';
  }

  async removeGroup(id: number): Promise<string> {
    const subGroups = await this.subgroupsService.getSubGroups(id);
    if (!subGroups)
      throw new BadRequestException('Немає підгруп у цій групі товарів');

    for (const subGroup of subGroups) {
      await this.subgroupsService.removeImgsSubGroup(subGroup.id);
    }

    await this.groupRepository.delete({ id });
    return 'Видалено';
  }
}
