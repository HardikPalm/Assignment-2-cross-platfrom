
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { User } from "../entities/user.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { AppType, AuthType, OsType, UserRole } from "./enum";


export class RemoveProduct {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ example: 1, description: 'product Id' })
    idProduct: number

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ example: 1, description: 'user Id' })
    idUser: number
}

