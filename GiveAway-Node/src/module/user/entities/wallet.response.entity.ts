import { ApiProperty } from "@nestjs/swagger";
import { ResponseInterceptor } from "../../../common/middleware/response.middleware";
export class WalletPageDataClass extends ResponseInterceptor<walletTransactionResponse> { }

export class walletTransactionResponse {
    @ApiProperty()
    idUser: number;

    @ApiProperty()
    transactionType: string;

    @ApiProperty()
    status: number;

    @ApiProperty()
    currencyType: string;

    @ApiProperty()
    extraDetails: JSON;

    @ApiProperty()
    amount: number;

    @ApiProperty()
    transactionCategory: string;

    @ApiProperty()
    reejctionReason: string;

    @ApiProperty()
    accountID: number
}
