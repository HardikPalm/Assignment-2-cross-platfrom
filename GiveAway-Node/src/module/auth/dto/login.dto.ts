import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AppType, AuthType, OsType, UserRole } from '../../user/dto/enum';
export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @ApiProperty({
    example: 'saumilmodi299@gmail.com',
    description: 'Email address to be registered',
  })
  email: string

  @IsNotEmpty()
  @IsString()
  @MinLength(6, {
    message:
      'Password is too short. Minimal length is $constraint1 characters.',
  })
  @ApiProperty({
    example: 'Palm@123',
    description: 'Password required to be use later while login in app',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: AuthType.LOCAL,
    description: 'Login type of user. In case of social media -> use that type',
  })
  authType: AuthType = AuthType.LOCAL;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: AppType.APP,
    description: 'Login type of user. In case of social media -> use that type',
  })
  appType: AppType = AppType.APP;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: OsType.ANDROID, description: 'Device os type' })
  os: OsType = OsType.ANDROID;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Samsung A50', description: 'Device brand name' })
  brand: string = 'Samsung A50';

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'SM-A12E', description: 'Device model number' })
  modelNo: string = 'SM-A12E';

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'SA4545as45a4', description: 'Device serial number' })
  serialNumber: string = 'SA4545as45a4';

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '1.0', description: 'version number' })
  versionNumber: string = '1.0';
}
