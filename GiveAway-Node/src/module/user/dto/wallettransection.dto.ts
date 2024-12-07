
import { IsEmail, IsEnum, IsJSON, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength, isNotEmpty } from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { TransectionType } from "./enum";

export class CreateWalletTransactionDto {

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ example: '81', description: 'userId' })
    idUser: number;

    @IsOptional()
    @IsEnum(TransectionType, { message: 'TransactionType must be Credit,Debit' })
    @ApiPropertyOptional({
        description: 'TransactionType',
        enum: TransectionType,
        default: TransectionType.CREDIT,
    })
    readonly TransectionType?: TransectionType;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ example: '1', description: 'status 1 for credit 0 for debit' })
    status: number

    @IsOptional()
    @IsNumber()
    @ApiPropertyOptional({ example: '100', description: 'amount to credit/debit' })
    amount?: number

    @IsOptional()
    @IsJSON()
    @ApiPropertyOptional({ example: '100', description: 'extraDetails JSON' })
    extraDetails?: Object

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ example: 'price winning', description: 'transactionCategory' })
    transactionCategory?: string

    @IsOptional()
    @IsNumber()
    @ApiPropertyOptional({ example: '1', description: 'accountID of usesr in which user will get payment' })
    accountID?: number

    @IsOptional()
    @IsString()
    @ApiPropertyOptional({ example: 'Too many transactions', description: 'rejection reason' })
    rejection?: string
}

