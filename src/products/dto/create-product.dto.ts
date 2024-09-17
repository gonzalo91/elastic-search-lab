import { IsString, IsNumber, IsBoolean, IsArray, IsOptional, IsPositive, ArrayNotEmpty } from 'class-validator';

export class CreateProductDto {
    

  @IsString()
  name: string;

  @IsString()
  @IsOptional()  // Esto es opcional si la descripción no es obligatoria
  description?: string;

  @IsNumber()
  @IsPositive()  // Valida que el precio sea un número positivo
  price: number;

  @IsString()
  category: string;

  @IsString()
  brand: string;

  @IsNumber()
  @IsPositive()  // Asegura que el stock sea un número positivo
  stock: number;

  @IsArray()
  @ArrayNotEmpty()  // Valida que el array no esté vacío
  @IsString({ each: true })  // Valida que cada elemento en el array sea una cadena de texto
  tags: string[];

  @IsBoolean()
  available: boolean;

}
