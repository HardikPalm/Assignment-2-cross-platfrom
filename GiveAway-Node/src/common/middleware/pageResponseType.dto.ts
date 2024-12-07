import { ApiProperty } from "@nestjs/swagger";
import { ResponseType } from "./responseType.dto";
import { PageMetaDto } from '../dto/PageMetaDto'


export class PageResponseType {


    @ApiProperty()
    statusCode: number;

    @ApiProperty()
    message: string;

    @ApiProperty()
    data: any;

    @ApiProperty()
    meta: PageMetaDto;

}