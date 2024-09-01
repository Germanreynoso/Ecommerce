import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateFileUploadDto {
  @IsNotEmpty()
  @IsString()
  originalname: string;

  @IsNotEmpty()
  @IsString()
  mimetype: string;

  @IsNotEmpty()
  @IsNumber()
  size: number;

  @IsNotEmpty()
  @IsString()
  buffer: string; // Asegúrate de que el tipo aquí coincida con el tipo de datos real
}
