
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { User } from "../entities/user.entity";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { AppType, AuthType, OsType, UserRole } from "./enum";
export class CreateUserDto extends User {

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


    @IsOptional()
    @ApiPropertyOptional({ example: 'Admin', description: 'Name of user' })
    description: string;

    @IsOptional()
    @ApiPropertyOptional({ example: '+91', description: 'country code' })
    countrycode: string;

    @IsOptional()
    @ApiPropertyOptional({ example: '+919999999999', description: 'mobileNumber' })
    mobileNumber: string;

    // @IsOptional()
    // @MinLength(12, {
    //     message: 'Mobile number is too short. Minimum length is $constraint1 characters.'
    // })
    // @MaxLength(14, {
    //     message: 'Mobile number is too short. Maximum length is $constraint1 characters.'
    // })
    // @ApiProperty({ example: '+919079463696', description: 'Phone number of a user' })
    // mobileNumber: string = '';


    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: UserRole.CUSTOMER, description: 'Role type of a user' })
    roleType: UserRole = UserRole.CUSTOMER;

    @IsNotEmpty()
    @IsString()
    @MinLength(6, {
        message: 'Password is too short. Minimal length is $constraint1 characters.'
    })
    @ApiProperty({ example: '12345678', description: 'Password required to be use later while login in app' })
    password: string

    // @IsNotEmpty()
    // @IsString()
    // @MinLength(6, {
    //     message: 'Password is too short. Minimal length is $constraint1 characters.'
    // })
    // @ApiProperty({ example: '12345678', description: 'Password required to be use later while login in app' })
    // confirmPassword: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: AuthType.LOCAL, description: 'Login type of user. In case of social media -> use that type' })
    authType: AuthType = AuthType.LOCAL;

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

