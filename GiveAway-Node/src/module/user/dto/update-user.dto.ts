
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { User } from "../entities/user.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateUserDto extends User {

    @IsNotEmpty()
    @IsString()
    @MinLength(2, {
        message: 'User name is too short. Minimal length is $constraint1 characters.'
    })
    @MaxLength(50, { message: 'First name is too long. Maximal length is $constraint1 characters.' })
    @ApiProperty({ example: 'John', description: 'Name of user' })
    fullName: string;

}

