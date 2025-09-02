import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCarreraDto {
    @ApiProperty({ description: 'El nombre de la carrera', example: 'Ingeniería de Software' })
    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    nombre: string;
}