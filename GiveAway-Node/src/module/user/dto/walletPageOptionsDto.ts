import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDefined, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { PageOptionsDto } from "../../../common/dto/PageOptionsDto";


export class WalletTransactionPageDto extends PageOptionsDto {

    @IsNotEmpty()
    @ApiProperty({ example: 81, description: 'Id of the user' })
    userId: number;

    @IsOptional()
    @ApiPropertyOptional({ example: '2024-01-01', description: 'Datefrom' })
    @IsString()
    dateFrom?: string;

    @IsOptional()
    @ApiPropertyOptional({ example: '2024-12-31', description: 'Dateto' })
    @IsString()
    dateTo?: string;

}
export class WalletRequestTransactionPageDto extends PageOptionsDto {

}

export class CountPriceDto extends PageOptionsDto {

}