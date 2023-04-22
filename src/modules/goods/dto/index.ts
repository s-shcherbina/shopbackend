import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';

export class CreateGoodDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumberString()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsNotEmpty()
  text: string;

  @IsNumber()
  subGroupId: number;
}
