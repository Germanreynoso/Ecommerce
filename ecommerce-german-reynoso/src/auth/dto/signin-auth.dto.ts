import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignInAuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  @IsString() // Asegura que el valor de la contraseña sea una cadena
  @MinLength(8) // Opcional: asegura una longitud mínima para la contraseña
  password: string;

  constructor(partial: Partial<SignInAuthDto>){
    Object.assign(this, partial)
  }
}
