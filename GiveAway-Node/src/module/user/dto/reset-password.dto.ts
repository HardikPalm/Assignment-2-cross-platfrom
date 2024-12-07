'use strict';

import { ApiProperty, } from '@nestjs/swagger';
import {
    IsString,
    MaxLength,
    IsNotEmpty,
    IsDefined,
} from 'class-validator';

export class ResetPasswordDto {

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: 'Old Password',
    })
    readonly OldPassword: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    @ApiProperty({
        description:
            'Password contain must be atleast 1 lowercase, 1 uppercase, 1 number and 8 or more character long',
        maxLength: 20,
    })
    readonly Password: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(20)
    @ApiProperty({
        description:
            'Confirm Password contain must be atleast 1 lowercase, 1 uppercase, 1 number and 8 or more character long',
        maxLength: 20,
    })
    readonly ConfirmPassword: string;

    idUser: number;
}
