import {
  BadGatewayException,
  HttpCode,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { QueryRunner } from 'typeorm';
import { UsersQueries } from './user.query';
import { CreateUserDto } from './dto/create-user.dto';
import * as _ from 'lodash';
import * as moment from 'moment';
import { User } from './entities/user.entity';
import { RequestType } from './entities/user-activity.enum';
import { CreateImageUrlDto } from './dto/create-imageurl.dto';
import * as fs from 'fs';
import { SQLService } from '../../shared/services/sql.service';
import {
  TableName,
  comparePassword,
  generateRefreshToken,
  getSecurePassword,
  StatusCode,
} from '../../common/constants/app.constants';
import { AuthService } from '../auth/auth.service';
import { ConfigService } from '../../shared/services/config.service';
import { LoginUserDto } from '../auth/dto/login.dto';
import { ForgotPasswordDto } from '../auth/dto/forget-password.dto';
import { ConfirmOtpDto } from '../auth/dto/confirm-otp.dto';
import { ChangePasswordDto } from '../auth/dto/change-password.dto';
import { NodeEmailerService } from '../../shared/services/node-emailer.service';
import { UploadService } from '../general/upload/upload.service';
import { SocialLoginDto } from './dto/social-login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { AddProductDto } from './dto/addproduct.dto';
import { RemoveProduct } from './dto/account.dto';

@Injectable()
export class UserService {
  constructor(
    private userQueries: UsersQueries,
    private SqlService: SQLService,
    private authService: AuthService,
    private configService: ConfigService,
    private nodeemailerservice: NodeEmailerService,
    private uploadservice: UploadService,
  ) { }

  async createUser(createUserDto: CreateUserDto) {
    let userInfo = await this.SqlService.run(
      this.userQueries.checkUserEmail(createUserDto.email),
      createUserDto.email,
    );

    if (!userInfo) {
      const hashPassword = await getSecurePassword(createUserDto.password);

      let keysPassword = ['value'];
      let valuePassword = [hashPassword];

      const insertUserArr = [
        'fullName',
        'email',
        'mobileNumber',
        'countrycode',
        'roleType',
        'description',
      ];
      const userKeys = _.pick(createUserDto, insertUserArr);
      const keysUser = Object.keys(userKeys);
      let valueUser = Object.values(userKeys);

      valueUser = valueUser.map((i) => "'" + i + "'");

      let res = await this.SqlService.run(
        this.userQueries.insertData(
          TableName.Table_Users,
          keysUser.join(','),
          valueUser.join(','),
        ),
      );

      keysPassword = [
        'userId',
        'authType',
        'identifier',
        'type',
        ...keysPassword,
      ];
      valuePassword = [
        res.insertId,
        createUserDto.authType,
        createUserDto.email,
        'Email',
        ...valuePassword,
      ];
      valuePassword = valuePassword.map((i) => "'" + i + "'");

      await this.SqlService.run(
        this.userQueries.insertData(
          TableName.Table_Passport,
          keysPassword.join(','),
          valuePassword.join(','),
        ),
      );

      let responseToken = await this.updateDeviceSpecificUserInformation(
        createUserDto,
        res.insertId,
      );

      let userInfo = await this.SqlService.run(
        this.userQueries.findOne(res.insertId),
      );
      // console.log(userInfo)
      // const createwallet = await this.SqlService.run(
      //   this.userQueries.wallet(), [userInfo?.userId, 0, 0]
      // )
      userInfo.refreshToken = responseToken.refresh_token;
      userInfo.accessToken = responseToken.access_token;

      this.entryInActivityTable(
        createUserDto,
        userInfo,
        RequestType.Register,
        userInfo.userId,
      );

      return userInfo;
    } else {
      // console.log(userInfo);

      throw new HttpException(
        {
          message: 'User already exists',
          statusCode: 405,
        },
        405,
      );
    }
  }

  async addProducs(addProducsdto: AddProductDto) {
    try {
      const insertData = await this.SqlService.run(
        this.userQueries.addProducts(), [addProducsdto?.name, addProducsdto?.description, addProducsdto?.location, addProducsdto?.rating, addProducsdto?.user_id]
      );
      return {
        statusCode: 200,
        message: "Product created successfully"
      }
    } catch (error) {
      throw new HttpException(
        {
          message: 'error in add products',
          statusCode: 400,
        },
        400,
      );
    }
  }

  async loginUser(loginUser: LoginUserDto) {
    let loginRes = await this.SqlService.run(
      this.userQueries.findUserLoggedIn(),
      [loginUser.authType, loginUser.email, loginUser.email],
    );

    if (loginRes) {
      let passwordCheck = await comparePassword(
        loginUser.password,
        loginRes.value,
      );

      if (passwordCheck) {
        delete loginRes.value;

        //Update device info of new login for multiple device handling purpose
        let responseToken = await this.updateDeviceSpecificUserInformation(
          loginUser,
          loginRes.userId,
        );

        loginRes.refreshToken = responseToken.refresh_token;
        loginRes.accesToken = responseToken.access_token;
        this.entryInActivityTable(
          loginUser,
          loginRes,
          RequestType.Login,
          loginRes.userId,
        );
        return loginRes;
      } else {
        throw new HttpException(
          {
            message: 'Password does not match',
            statusCode: 400,
          },
          400,
        );
      }
    } else {
      throw new HttpException(
        {
          message: 'User does not exist',
          statusCode: 405,
        },
        400,
      );
    }
  }

  async updateDeviceSpecificUserInformation(
    createUserDto: LoginUserDto | SocialLoginDto,
    userId: number,
  ) {
    //Update device info of new login for multiple device handling purpose

    let deviceDummyArr = ['appType', 'os', 'brand', 'modelNo'];
    let deviceArr = _.pick(createUserDto, deviceDummyArr);
    let deviceKeys = Object.keys(deviceArr);
    let deviceValue = Object.values(deviceArr);

    var deviceInfo = await this.SqlService.run(
      this.userQueries.checkUserDevice(deviceKeys),
      deviceValue,
    );

    let deviceId = 0;
    if (deviceInfo == null) {
      deviceId = 0;
    } else {
      deviceId = deviceInfo.deviceId;
    }

    if (deviceId == 0) {
      deviceValue = deviceValue.map((i) => "'" + i + "'");

      let resDevice = await this.SqlService.run(
        this.userQueries.insertData(
          TableName.Table_Devices_Info,
          deviceKeys.join(','),
          deviceValue.join(','),
        ),
      );

      deviceId = resDevice.insertId;
    }

    var jsonPayload = {};
    jsonPayload['userId'] = userId;
    jsonPayload['deviceId'] = deviceId;
    jsonPayload['serialNumber'] = createUserDto.serialNumber;
    jsonPayload['versionNumber'] = createUserDto.versionNumber;
    jsonPayload['aud'] = this.configService.get('JWT_AUDIENCE');
    jsonPayload['iss'] = this.configService.get('JWT_ISSUER');

    let refreshToken: string = await generateRefreshToken(10);
    let accessToken: string = await this.authService.generateAccessToken(
      jsonPayload,
    );

    let sessionValues = [
      Number(userId),
      Number(deviceId),
      createUserDto.serialNumber,
      createUserDto.versionNumber,
      refreshToken.toString(),
      accessToken.toString(),
    ];
    let sessionKeys = [
      'userId',
      'deviceId',
      'serialNumber',
      'versionNumber',
      'refreshToken',
      'accessToken',
    ];

    await this.SqlService.run(
      this.userQueries.insertUpdateSessionInfo(
        sessionKeys.join(','),
        sessionValues,
        createUserDto.versionNumber,
        refreshToken,
        accessToken,
      ),
    );

    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    let unit: moment.DurationInputArg2 = this.configService.get(
      'OTP_ADDING_UNIT',
    ) as moment.DurationInputArg2;
    let time = this.configService.get('OTP_ADDING_VALUE');
    let otp_code = `${Math.floor(1000 + Math.random() * 9000).toString()}`;
    let user: User = await this.SqlService.run(
      this.userQueries.findOneByEmail(forgotPasswordDto.email),
      [forgotPasswordDto.email.toString()],
    );
    if (user && user.userId) {
      // const updateRetryCount = await this.SqlService.run(this.userQueries.updateOtpCountQuery(0, forgotPasswordDto.email))
      let data = {
        email: `${user.email}`,
        otp: `${otp_code}`,
        expiryTime: `${moment().add(time, unit).format('YYYY-MM-DD HH:mm:ss')}`,
        retryCount: 0,
      };

      let dummydata = { ...data };
      delete dummydata.email;
      let arr = [];
      arr = Object.values(data);
      arr = arr.concat(Object.values(dummydata));
      const generatedOtp = await this.SqlService.run(
        this.userQueries.insertUpdateAddVerificationCode(
          Object.keys(data).join(','),
        ),
        arr,
      );
      if (generatedOtp.affectedRows > 0) {
        if (generatedOtp.insertId == 0) {
          this.entryInActivityTable(
            forgotPasswordDto,
            'OTP has been sent to given email',
            RequestType.ForgotPassword,
            user.userId,
          );

          /// send mail
          try {
            await this.nodeemailerservice.sendEmail(
              'Palminfotech Apps <noreply.palminfotech@gmail.com>',
              forgotPasswordDto.email,
              'Forgot Password Email Verification',
              './forgotpassword',
              {
                // Data to be sent to template engine.
                email: forgotPasswordDto.email,
                OTP: otp_code,
              },
              1,
            );
          } catch (error) { }
          return {
            message: 'OTP has been sent to given email',
            statusCode: 201,
          };
        } else {
        }
      }
    } else {
      throw new HttpException('User not found', 405);
    }
  }

  async confirmOtp(confirmOtpDto: ConfirmOtpDto) {
    const otp = await this.SqlService.run(
      this.userQueries.fetchOtpQuery(confirmOtpDto.email),
    );

    if (otp?.otp == confirmOtpDto.otp) {
      const update = await this.updateRetryCountOtp(otp);
      if (moment().isAfter(otp.expiryTime)) {
        throw new HttpException(
          {
            message: 'Otp expired',
            statusCode: 415,
          },
          415,
        );
      } else {
        let user: User = await this.SqlService.run(
          this.userQueries.findOneByEmail(confirmOtpDto.email),
          [confirmOtpDto.email.toString()],
        );
        return {
          message: 'Success',
          statusCode: 201,
        };
      }
    } else {
      if (otp == undefined || otp == null) {
        throw new HttpException(
          {
            message: 'User does not exists',
          },
          405,
        );
      }
      throw new HttpException(
        {
          message: 'Invalid otp',
        },
        417,
      );
    }
  }

  async updateRetryCountOtp(confirmOtpDto: any): Promise<boolean> {
    let count = confirmOtpDto.retryCount + 1;

    if (count > Number(this.configService.get('MAX_RETRY_COUNT'))) {
      throw new HttpException(
        {
          message: `You've exceeded the maximum number of attempts`,
        },
        416,
      );
    } else {
      const generatedOtp = await this.SqlService.run(
        this.userQueries.updateOtpCountQuery(count, confirmOtpDto.email),
      );
      if (generatedOtp.affectedRows > 0) {
        return true;
      }
    }
  }

  async resetPassword(changePasswordDto: ChangePasswordDto) {
    let user: User = await this.SqlService.run(
      this.userQueries.findOneByEmail(changePasswordDto.email),
      [changePasswordDto.email.toString()],
    );
    if (user && user.userId) {
      if (
        changePasswordDto['password'] == changePasswordDto['confirm_password']
      ) {
        const hashedPassword = await getSecurePassword(
          changePasswordDto['password'],
        );
        let passportdata = {
          userId: user.userId,
          identifier: `${changePasswordDto.email}`,
          type: 'Email',
        };

        passportdata['authType'] = 'Local';
        passportdata['value'] = hashedPassword;
        let arr = Object.values(passportdata);
        arr.push(hashedPassword);
        const queryRunner = await this.SqlService.run(
          this.userQueries.insertUpdatePassword(
            Object.keys(passportdata).join(','),
          ),
          arr,
        );
        if (queryRunner.affectedRows > 0) {
          await this.removeOtp(user.email, user.userId);
          this.entryInActivityTable(
            changePasswordDto,
            'Password changed successfully',
            RequestType.ResetPassword,
            user.userId,
          );

          return { message: 'Password changed successfully', statusCode: 201 };
        }
      } else {
        throw new HttpException(
          {
            message: 'Password does not match',
            statusCode: 400,
          },
          400,
        );
      }
    } else {
      throw new HttpException(
        {
          message: 'User does not exists',
          statusCode: 405,
        },
        405,
      );
    }
    return true;
  }

  async removeOtp(email: string, userId: number): Promise<boolean> {
    let otp = await this.SqlService.run(this.userQueries.fetchOtpQuery(email));
    if (otp) {
      otp.expiryTime = `"${moment(otp.expiryTime).format(
        'YYYY-MM-DD HH:mm:ss',
      )}"`;
      otp.email = `"${otp.email}"`;
      otp.otp = `"${otp.otp}"`;
      otp.userId = userId;
      let keysOTP = Object.keys(otp);
      let valueUser = Object.values(otp);
      let res = await this.SqlService.run(
        this.userQueries.insertData(
          TableName.Table_OTP_History,
          keysOTP.join(','),
          valueUser.join(','),
        ),
      );
      const queryRunner = await this.SqlService.run(
        this.userQueries.deleteOtp(email),
      );

      if (queryRunner.affectedRows > 0) {
        return true;
      } else {
        throw new HttpException(
          {
            message: 'Something went wrong',
            statusCode: 400,
          },
          400,
        );
      }
    } else {
      throw new HttpException(
        {
          message: 'Something went wrong',
          statusCode: 400,
        },
        400,
      );
    }
  }

  async entryInActivityTable(req: any, res: any, type: any, userId: any = '') {
    let obj = {
      req: JSON.stringify(req),
      response: JSON.stringify(res),
      type,
      userId,
    };
    let keys = Object.keys(obj);
    let values = Object.values(obj);
    values = values.map((i) => "'" + i + "'");
    try {
      var result = await this.SqlService.run(
        this.userQueries.insertData(
          TableName.Table_User_Activity,
          keys.join(','),
          values.join(','),
        ),
      );
    } catch (error) {
      // console.log(`============error==============`)
      // console.log(error);
      // console.log(`============error==============`)
    }
  }

  async createUrl(data: CreateImageUrlDto) {
    try {
      if (data && data.FilePath && data.tokenId) {
        try {
          const awspath = await this.uploadservice.uploadTempFileTopS3({
            Type: 'ProfileImage',
            ...data,
          });
          if (awspath) {
            // data.ImageURL = awspath;

            try {
              const file = await this.uploadservice.getTempUpload(data);
              const filepath = file['path'] || file[0].path;

              const deleted = await this.uploadservice.deleteTempUpload(
                data.tokenId,
              );
              fs.unlink(filepath, (err: any) => { });
            } catch (error) {
              throw new HttpException(
                { message: 'Internal server error' },
                HttpStatus.INTERNAL_SERVER_ERROR,
              );
            }
            // console.log("ImageUrl is:",awspath);
            return { ImageUrl: awspath };
            // return await this.sqlService.run(this.query.update(), data);
          } else {
            throw new HttpException(
              { message: 'something went wrong' },
              HttpStatus.BAD_REQUEST,
            );
          }
        } catch (error) {
          // return await this.sqlService.run(this.query.update(), data);
        }
      } else {
        // return await this.sqlService.run(this.query.update(), data);
      }
    } catch (error) {
      throw error;
    }
  }

  async socialLogin(socialData: SocialLoginDto) {
    var exist = await this.SqlService.run(
      this.userQueries.findOneByEmail(socialData.email),
    );

    if (exist) {
      let responseToken = await this.updateDeviceSpecificUserInformation(
        socialData,
        exist.userId,
      );

      let updatePassport = await this.SqlService.run(
        this.userQueries.updateEntryInPassport({ ...exist, ...socialData }),
      );

      exist.refreshToken = responseToken.refresh_token;
      exist.accessToken = responseToken.access_token;
      this.entryInActivityTable(
        socialData,
        exist,
        RequestType.Login,
        exist.userId,
      );

      return exist;
    } else {
      const insertUserArr = ['fullName', 'email', 'roleType'];
      const userKeys = _.pick(socialData, insertUserArr);
      const keysUser = Object.keys(userKeys);
      let valueUser = Object.values(userKeys);

      valueUser = valueUser.map((i) => "'" + i + "'");

      let res = await this.SqlService.run(
        this.userQueries.insertData(
          TableName.Table_Users,
          keysUser.join(','),
          valueUser.join(','),
        ),
      );

      let keysPassword = ['userId', 'authType', 'identifier', 'type'];
      let valuePassword = [
        res.insertId,
        socialData.authType,
        socialData.email,
        'Email',
      ];
      valuePassword = valuePassword.map((i) => "'" + i + "'");

      await this.SqlService.run(
        this.userQueries.insertData(
          TableName.Table_Passport,
          keysPassword.join(','),
          valuePassword.join(','),
        ),
      );

      let responseToken = await this.updateDeviceSpecificUserInformation(
        socialData,
        res.insertId,
      );

      let userInfo = await this.SqlService.run(
        this.userQueries.findOne(res.insertId),
      );
      userInfo.refreshToken = responseToken.refresh_token;
      userInfo.accessToken = responseToken.access_token;

      this.entryInActivityTable(
        socialData,
        userInfo,
        RequestType.Register,
        userInfo.userId,
      );

      return userInfo;
    }
  }

  async updateProfile(data: UpdateUserDto, user: any, id: string) {
    if (user?.userId == id) {
      var res = await this.SqlService.run(
        this.userQueries.update({ ...user, ...data }),
      );

      if (res.affectedRows > 0) {
        var userInfo = await this.SqlService.run(
          this.userQueries.findUserByIDQuery(
            user?.deviceId,
            user?.userId,
            user?.serialNumber,
          ),
        );

        if (userInfo) {
          return {
            message: 'User Profile Updated Successfully',
            result: userInfo,
            statusCode: 200,
          };
        } else {
        }
      } else {
        throw new HttpException(
          {
            message: 'User does not exist',
            statusCode: 405,
          },
          405,
        );
      }
    } else {
      throw new HttpException(
        {
          message: 'User is not valid',
          statusCode: 405,
        },
        405,
      );
    }
  }

  async changePassword(resetpasswordDto: ResetPasswordDto) {
    if (resetpasswordDto.ConfirmPassword !== resetpasswordDto.Password) {
      throw new HttpException(
        {
          message: 'Password deos not match',
          statusCode: 405,
        },
        405,
      );
    }
    const getPassword = await this.SqlService.run(
      this.userQueries.getPasswordInfo(resetpasswordDto.idUser),
    );
    const compared_password = await comparePassword(
      resetpasswordDto.OldPassword,
      getPassword.value,
    );

    if (!compared_password) {
      throw new HttpException(
        {
          message: 'Invalid Old password',
          statusCode: 405,
        },
        405,
      );
    }
    const encrypt_password = await getSecurePassword(
      resetpasswordDto.ConfirmPassword,
    );

    // await this.updatePassword({
    //   idUser: resetPasswordDto.idUser,
    //   Password: encrypt_password,
    // });
    const updatePassword = await this.SqlService.run(
      this.userQueries.UpdatePassword(
        resetpasswordDto.idUser,
        encrypt_password,
      ),
    );

    return {
      message: 'Password changed successfully',
      result: [],
      statusCode: 200,
    };
  }

  async deleteUser(id: string | number) {
    var res = await this.SqlService.run(this.userQueries.deleteUser(id));

    if (res.affectedRows > 0) {
      return {
        message: 'User deleted successfully',
        statusCode: 200,
      };
    } else {
      throw new HttpException(
        {
          message: 'Something went wrong',
          statusCode: 405,
        },
        405,
      );
    }
  }

  async RefreshToken(refreshtokenDto: RefreshTokenDto) {
    const getRefreshTokenInfo = await this.SqlService.run(
      this.userQueries.getRefreshToken(refreshtokenDto.refreshToken),
    );
    if (getRefreshTokenInfo) {
      var jsonPayload = {};
      jsonPayload['userId'] = getRefreshTokenInfo.userID;
      jsonPayload['deviceId'] = getRefreshTokenInfo.deviceID;
      jsonPayload['serialNumber'] = getRefreshTokenInfo.serialNumber;
      jsonPayload['versionNumber'] = getRefreshTokenInfo.versionNumber;
      jsonPayload['aud'] = this.configService.get('JWT_AUDIENCE');
      jsonPayload['iss'] = this.configService.get('JWT_ISSUER');

      let refreshToken: string = await generateRefreshToken(10);
      let accessToken: string = await this.authService.generateAccessToken(
        jsonPayload,
      );
      const updateToken = await this.SqlService.run(
        this.userQueries.updateTokens(
          refreshtokenDto.refreshToken,
          refreshToken,
          accessToken,
        ),
      );
      let obj = {};
      obj['accessToken'] = accessToken;
      obj['refreshToken'] = refreshToken;
      return {
        message: 'AccessToken and RefreshToken updated successfully',
        result: obj,
        statusCode: 201,
      };
    } else {
      throw new HttpException(
        {
          message: 'Invalid RefreshToken',
          statusCode: 405,
        },
        405,
      );
    }
  }

  async sendOtp(forgotPasswordDto: ForgotPasswordDto) {
    let unit: moment.DurationInputArg2 = this.configService.get(
      'OTP_ADDING_UNIT',
    ) as moment.DurationInputArg2;
    let time = this.configService.get('OTP_ADDING_VALUE');
    let otp_code = `${Math.floor(1000 + Math.random() * 9000).toString()}`;

    let data = {
      email: `${forgotPasswordDto.email}`,
      otp: `${otp_code}`,
      expiryTime: `${moment().add(time, unit).format('YYYY-MM-DD HH:mm:ss')}`,
      retryCount: 0,
    };

    let dummydata = { ...data };
    delete dummydata.email;
    let arr = [];
    arr = Object.values(data);
    arr = arr.concat(Object.values(dummydata));
    const generatedOtp = await this.SqlService.run(
      this.userQueries.insertUpdateAddVerificationCode(
        Object.keys(data).join(','),
      ),
      arr,
    );

    /// send mail
    try {
      await this.nodeemailerservice.sendEmail(
        'Palminfotech Apps <noreply.palminfotech@gmail.com>',
        forgotPasswordDto.email,
        'Email Verification',
        './forgotpassword',
        {
          // Data to be sent to template engine.
          email: forgotPasswordDto.email,
          OTP: otp_code,
        },
        1,
      );
    } catch (error) {
      // console.log("err", error)
      throw new HttpException('Unable to send otp', 409);
    }
    return { message: 'OTP has been sent to given email', statusCode: 201 };
  }

  async confirmOtpV2(confirmOtpDto: ConfirmOtpDto) {
    try {
      const otp = await this.SqlService.run(
        this.userQueries.fetchOtpQuery(confirmOtpDto.email),
      );
      if (otp == undefined || otp == null) {
        throw new HttpException({ message: 'Please resend otp.' }, 405);
      }

      if (otp?.otp == confirmOtpDto.otp) {
        if (moment().isAfter(otp.expiryTime)) {
          throw new HttpException(
            { message: 'Otp expired', statusCode: 415 },
            415,
          );
        }
        await this.SqlService.run(
          this.userQueries.deleteOtp(confirmOtpDto.email),
        );
        return { message: 'Successfully verified otp', statusCode: 201 };
      } else {
        throw new HttpException({ message: 'Invalid otp' }, 417);
      }
    } catch (error) {
      throw error;
    }
  }

  async getUserProductsData(user: User) {
    try {
      if (user?.userId) {
        const getwalletdata = await this.SqlService.run(
          this.userQueries.getProducdata(), [user?.userId]
        );
        return {
          data: getwalletdata,
          statusCode: 200,
          message: "getproduct data successfully"
        }
      } else {
        throw new HttpException(
          {
            message: 'No userId found',
            statusCode: 405,
          },
          405,
        );
      }
    } catch (error) {
      throw new HttpException(
        {
          message: 'Can not find walletdata',
          statusCode: 405,
        },
        405,
      );
    }
  }

  async getAllproducts() {
    try {
      const getwalletdata = await this.SqlService.run(
        this.userQueries.getallProducts()
      )
      return {
        data: getwalletdata,
        statusCode: 200,
        message: "getAllproducts data successfully"
      }
    } catch (error) {
      throw new HttpException(
        {
          message: 'Can not find walletdata',
          statusCode: 405,
        },
        405,
      );
    }
  }

  async removeProduct(removeProductId: RemoveProduct, user: User) {
    try {
      const removeAccountsQuery = await this.SqlService.run(
        this.userQueries.removeProduct(), [removeProductId?.idUser, removeProductId?.idProduct]
      )
      return {
        statusCode: 200,
        data: removeAccountsQuery,
        message: "Product Removed successfully"
      }
    } catch (error) {
      throw new HttpException(
        {
          message: "Something Went Wrong",
          statusCode: 405,
        },
        error,
      );
    }
  }
}