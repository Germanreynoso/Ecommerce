import { IsArray, IsString, IsUUID, ValidateNested, ArrayMinSize } from "class-validator";
import { Type } from "class-transformer";

export class ProductIdDto { // Nombre correcto
  @IsUUID('4') // Asegura que id sea un UUID versión 4
  id: string;
}

export class CreateOrderDto {
  @IsUUID('4') // Asegura que userId sea un UUID versión 4
  userId: string;

  @IsArray()
  @ArrayMinSize(1) // Asegura que el array tenga al menos un elemento
  @ValidateNested({ each: true })
  @Type(() => ProductIdDto) // Transforma los elementos del array a ProductIdDto
  products: ProductIdDto[];
}
