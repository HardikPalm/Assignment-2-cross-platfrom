
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { User } from "../entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";
import { AppType, AuthType, OsType, UserRole } from "./enum";


export class SocialLoginDto extends User {

    @IsNotEmpty()
    @IsString()
    @MinLength(2, {
        message: 'User name is too short. Minimal length is $constraint1 characters.'
    })
    @MaxLength(30, { message: 'User name is too long. Maximal length is $constraint1 characters.' })
    @ApiProperty({ example: 'Admin', description: 'Name of user' })
    fullName: string = 'Admin';

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty({ example: 'Admin@gmail.com', description: 'Email address to be registered' })
    email: string = 'Admin@gmail.com';


    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: UserRole.CUSTOMER, description: 'Role type of a user' })
    roleType: UserRole = UserRole.CUSTOMER;


    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: AuthType.GOOGLE, description: 'Login type of user. In case of social media -> use that type' })
    authType: AuthType = AuthType.GOOGLE;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: AppType.APP, description: 'Login type of user. In case of social media -> use that type' })
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
    modelNo: string = "SM-A12E";

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'SA4545as45a4', description: 'Device serial number' })
    serialNumber: string = "SA4545as45a4";

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: '1.0', description: 'version number' })
    versionNumber: string = "1.0";



}

