import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsString,
    MinLength,
} from 'class-validator';

export class RegisterUserDto {
    @ApiProperty({ example: '202400100' })
    @IsString()
    @IsNotEmpty()
    registro: string;

    @ApiProperty({ example: '1234567' })
    @IsString()
    @IsNotEmpty()
    ci: string;

    @ApiProperty({ example: 'Juan Perez' })
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @ApiProperty({ example: 'juan.perez@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'password123' })
    @IsString()
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    password: string;

    @ApiProperty({
        description: 'ID de la carrera a la que se inscribe el estudiante',
        example: 1,
    })
    @IsNumber()
    carreraId: number;
}