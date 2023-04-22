import { IsNotEmpty, IsNumber } from 'class-validator';

export class createOrderGoodDTO {
  @IsNotEmpty()
  @IsNumber()
  items: number;

  @IsNotEmpty()
  @IsNumber()
  goodId: number;

  @IsNotEmpty()
  @IsNumber()
  orderId: number;
}
