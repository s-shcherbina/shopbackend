import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @IsString()
  @IsNotEmpty()
  locality: string;

  @IsString()
  @IsNotEmpty()
  delivery: string;

  @IsString()
  @IsNotEmpty()
  department: string;
}

export class CreateSuperUserDTO extends CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  password: string;

  role?: string;
}

// export class UpdateSuperUserDTO extends CreateUserDTO {
//   @IsString()
//   @IsNotEmpty()
//   @IsEmail()
//   email: string;
// }
