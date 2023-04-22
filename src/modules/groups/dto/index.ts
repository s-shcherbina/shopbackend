import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGroupDTO {
  @IsString()
  @IsNotEmpty()
  name: string;
}
