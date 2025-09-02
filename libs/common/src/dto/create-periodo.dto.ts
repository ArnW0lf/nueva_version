import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePeriodoDto {
    @ApiProperty({
        description: 'Nombre del periodo académico',
        example: '2025-1',
    })
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @ApiProperty({ description: 'Fecha de inicio del periodo', example: '2025-02-01' })
    @IsDateString()
    fechaInicio: Date;

    @ApiProperty({ description: 'Fecha de fin del periodo', example: '2025-06-30' })
    @IsDateString()
    fechaFin: Date;

    @ApiProperty({ description: 'Indica si el periodo está activo para inscripciones', example: false, default: false })
    @IsBoolean()
    @IsOptional()
    activo?: boolean;
}