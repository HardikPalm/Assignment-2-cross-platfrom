
import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Query, ValidationPipe, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateImageUrlDto } from './dto/create-imageurl.dto';
import { User } from '../../common/decorators/user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { CreateWalletDto } from './dto/wallet.dto';
import { WalletTransactionPageDto } from './dto/walletPageOptionsDto';
import { CreateWalletTransactionDto } from './dto/wallettransection.dto';
import { ResponseInterceptor } from '../../common/middleware/response.middleware';
import { AddProductDto } from './dto/addproduct.dto';
import { RemoveProduct } from './dto/account.dto';

@Controller('User')
@ApiTags('User')
@ApiBearerAuth()

export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('ImageUrl')
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 200,
    description: 'User registered successfully',
    // type: User,

  })
  @ApiResponse({
    status: 403,
    description: 'User already exists',
  })
  CreateImageUrl(@Body() ImageUrlDto: CreateImageUrlDto, @User() auth_user: any) {


    return this.userService.createUrl(ImageUrlDto)
  }


  @Put('update/:id')
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 200,
    description: 'Profile Updated successfully',
    // type: User,

  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  update(@Body() UpdateUserDto: UpdateUserDto, @User() auth_user: any, @Param('id') id: string) {

    return this.userService.updateProfile(UpdateUserDto, auth_user, id)
  }

  @Post('changepassword')
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 200,
    description: 'Password changed successfully'
  })
  @ApiResponse({
    status: 405,
    description: 'Password doesnot exist',
  })
  async changepassword(@Body() resetpasswordDto: ResetPasswordDto, @User() auth_user: any) {
    resetpasswordDto.idUser = auth_user.userId;
    let res = await this.userService.changePassword(resetpasswordDto)
    return res
  }

  @Delete('delete/:userId')
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully',
    // type: User,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  delete(@Param('userId') id: string) {
    return this.userService.deleteUser(id)
  }


  @Post('addproducts')
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 200,
    description: 'addproduct successfully'
  })
  @ApiResponse({
    status: 405,
    description: 'Product doesnot exist',
  })
  async addproducts(@Body() addproductdto: AddProductDto,) {
    let res = await this.userService.addProducs(addproductdto)
    return res
  }

  @Get('getUserproducts')
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 200,
    description: 'Got wallet data',
  })
  getUserProducts(
    @User() user: any,
  ) {
    return this.userService.getUserProductsData(user);
  }

  @Put('removeProduct')
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 200,
    description: 'Account Removed successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  removeProduct(@Body() RemoveProduct: RemoveProduct, @User() user: any) {
    return this.userService.removeProduct(RemoveProduct, user)
  }

  @Get('getAllproducts')
  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })
  @ApiResponse({
    status: 200,
    description: 'Got wallet data',
  })
  getAllproducts(
    @User() user: any,
  ) {
    return this.userService.getAllproducts();
  }

}

