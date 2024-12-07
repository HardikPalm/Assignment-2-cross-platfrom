
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength, isNotEmpty } from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateWalletDto {

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ example: '81', description: 'userId' })
    idUser: number;

    @IsOptional()
    @IsNumber()
    @ApiProperty({ example: '100', description: 'totalBalance' })
    totalBalance: number

    @IsOptional()
    @IsNumber()
    @ApiProperty({ example: '100', description: 'pendingBalance' })
    pendingBalance: number
}

