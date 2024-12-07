
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { User } from "../entities/user.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { AppType, AuthType, OsType, UserRole } from "./enum";
export class AddProductDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Headphone', description: 'Headphone' })
    name: string;

    @IsOptional()
    @ApiPropertyOptional({ example: 'good headphone', description: 'description of product' })
    description: string;

    @IsOptional()
    @ApiPropertyOptional({ example: 'ontario', description: 'location of product' })
    location: string;

    @IsOptional()
    @ApiPropertyOptional({ example: '1', description: 'give product raing 1 to 5' })
    rating: string;

    @IsOptional()
    @ApiPropertyOptional({ example: '1', description: 'userId' })
    user_id: string;

}

