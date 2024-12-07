import { ApiProperty } from '@nestjs/swagger';
import { PageMetaDto } from '../../../common/dto/PageMetaDto';
import { ResponseType } from '../../../common/middleware/responseType.dto';
import { PageResponseType } from '../../../common/middleware/pageResponseType.dto';
import { walletTransactionResponse } from '../entities/wallet.response.entity'; 

export class WalletTransactionPageExtDto extends PageResponseType {
  @ApiProperty({
    type: walletTransactionResponse,
    isArray: true,
  })
  readonly data: walletTransactionResponse[];

  @ApiProperty()
  readonly meta: PageMetaDto;

  constructor(data: walletTransactionResponse[], meta: PageMetaDto) {
    super();
    this.data = data;
    this.meta = meta;
  }
}

// export class SongPageDtoResponse extends ResponseType<SongPageDto> {
//     @ApiProperty({
//         type: SongResponse,
//     })
//     data: SongPageDto;
// }
