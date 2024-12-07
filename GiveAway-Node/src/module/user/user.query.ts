import { Injectable, Query } from '@nestjs/common';
import { DBQuery } from '../../common/interface/dbquery.interface';
import {
  TableName,
  selectWithWhereClause,
} from '../../common/constants/app.constants';
import * as _ from 'lodash';

@Injectable()
export class UsersQueries {
  findAll(): string {
    return `SELECT * FROM  ${TableName.Table_Users}`;
  }

  findOne(id: number): DBQuery {
    const query = `SELECT * FROM ${TableName.Table_Users} where userId = ${id}`;
    return {
      name: 'findOne',
      type: 'SELECT_ONE',
      query: query,
    };
  }

  findOneByEmail(email: string): DBQuery {
    const query = `SELECT * FROM ${TableName.Table_Users} where email = "${email}" AND status=1`;
    return {
      name: 'findOneByEmail',
      type: 'SELECT_ONE',
      query: query,
    };
  }

  findUserByIDQuery(
    idDevice: number,
    idUser: number,
    serialNumber: string,
  ): DBQuery {
    const query = `SELECT  u.*,s.accessToken,s.deviceId,s.serialNumber FROM ${TableName.Table_Users} u left join ${TableName.Table_User_Session} s on u.userId = s.userId where s.userId = ${idUser} and s.deviceId = ${idDevice} and s.serialNumber = "${serialNumber}"`;

    return {
      name: 'findUserByIDQuery',
      type: 'SELECT_ONE',
      query: query,
    };
  }

  findUserLoggedIn(): DBQuery {
    const query = `SELECT u.*,p.value FROM ${TableName.Table_Users} u  LEFT JOIN  ${TableName.Table_Passport} p ON p.userId = u.userId AND p.authType =? AND p.identifier =? WHERE u.email=? AND u.status=1`;

    return {
      name: 'findUserLoggedIn',
      type: 'SELECT_ONE',
      query: query,
    };
  }

  checkUserEmail(params: string): DBQuery {
    const query = `SELECT * FROM ${TableName.Table_Users} u
         WHERE u.email=?`;
    return {
      name: 'checkUserEmail',
      type: 'SELECT_ONE',
      query: query,
    };
  }

  checkUserDevice(params) {
    let result = '';
    params.forEach((element, index) => {
      result =
        result +
        element +
        '=? ' +
        (Number(index) != Number(params.length - 1) ? 'AND ' : '');
    });
    const query = `SELECT deviceId FROM  ${TableName.Table_Devices_Info}  
        WHERE ${result}`;

    return {
      name: 'checkUserDevice',
      type: 'SELECT_ONE',
      query: query,
    };
  }

  insertData(tableName: string, key: string, value: string) {
    const query = `INSERT INTO ${tableName} (${key}) values (${value})`;
    return {
      name: 'insertData',
      type: 'INSERT',
      query: query,
    };
  }

  insertUpdateSessionInfo(
    key: string,
    value: any,
    versionNumber: any,
    refreshToken: string,
    accessToken: string,
  ) {
    let val = value.map((i) => "'" + i + "'");
    const query = `INSERT INTO  ${TableName.Table_User_Session
      } (${key}) VALUES (${val.join(
        ',',
      )}) ON DUPLICATE KEY UPDATE versionNumber=${versionNumber}, refreshToken="${refreshToken}" , accessToken="${accessToken}"`;

    return {
      name: 'insertUpdateSessionInfo',
      type: 'INSERT',
      query: query,
    };
  }

  insertUpdatePassword(key: string) {
    const query = `INSERT INTO  ${TableName.Table_Passport} (${key}) values (?,?,?,?,?) ON DUPLICATE KEY UPDATE value =?`;
    return {
      name: 'insertUpdatePassword',
      type: 'INSERT',
      query: query,
    };
  }

  insertUpdateAddVerificationCode(key: string): DBQuery {
    const query = `INSERT INTO ${TableName.Table_Otp_Verification} (${key}) VALUES (?,?,?,?) ON DUPLICATE KEY UPDATE otp=?, expiryTime=?, retryCount=?`;
    return {
      name: 'insertUpdateAddVerificationCode',
      type: 'INSERT',
      query: query,
    };
  }

  updateOtpCountQuery(count: number, email: string): DBQuery {
    const query = `UPDATE ${TableName.Table_Otp_Verification} SET retryCount=${count} where email="${email}";`;
    return {
      name: 'updateOtpCountQuery',
      type: 'UPDATE',
      query: query,
    };
  }

  fetchOtpQuery(email: string): DBQuery {
    const query = `SELECT * FROM ${TableName.Table_Otp_Verification} WHERE email="${email}"`;
    return {
      name: 'fetchOtpQuery',
      type: 'SELECT_ONE',
      query: query,
    };
  }

  deleteOtp(email: string): DBQuery {
    const query = `DELETE FROM ${TableName.Table_Otp_Verification} where email="${email}"`;
    return {
      name: 'deleteOtp',
      type: 'DELETE',
      query: query,
    };
  }

  updateEntryInPassport(where: any): DBQuery {
    const query = `UPDATE  ${TableName.Table_Passport} set authType = '${where.authType}' where userId = '${where.userId}'`;
    return {
      name: 'updateEntryInPassport',
      type: 'SELECT_ONE',
      query: query,
    };
  }

  update(where: any): DBQuery {
    var allowedKeys = ['fullName'];

    const obj = _.pick(where, allowedKeys);
    let query = `UPDATE ${TableName.Table_Users} SET `;
    const temp: any[] = [];
    _.mapKeys(obj, (value, key) => {
      temp.push(`${key} = '${value}'`);
    });
    query += `${temp.join(',')} WHERE userId = ${where.userId}`;

    return {
      name: 'update',
      type: 'UPDATE',
      query: query,
    };
  }

  getPasswordInfo(idUser: number): DBQuery {
    const query = `SELECT * FROM ${TableName.Table_Passport} WHERE userId=${idUser}`;
    return {
      name: 'getPasswordInfo',
      type: 'SELECT_ONE',
      query: query,
    };
  }

  UpdatePassword(idUser: number, password: string): DBQuery {
    const query = `Update ${TableName.Table_Passport} set value = '${password}' where userId = ${idUser}`;
    return {
      name: 'updatePassword',
      type: 'UPDATE',
      query: query,
    };
  }

  deleteUser(idUser: number | String): DBQuery {
    const query = `Update ${TableName.Table_Users} set status = 127 where userId = ${idUser}`;

    return {
      name: 'deleteUser',
      type: 'DELETE',
      query: query,
    };
  }

  getRefreshToken(refreshToken: string): DBQuery {
    const query = `select * from ${TableName.Table_User_Session} where refreshToken = '${refreshToken}' `;
    return {
      name: 'getRefreshToken',
      type: 'SELECT_ONE',
      query: query,
    };
  }

  updateTokens(
    refreshToken: string,
    newRefreshToken: string,
    accessToken: string,
  ): DBQuery {
    const query = ` update ${TableName.Table_User_Session} set accessToken = '${accessToken}',refreshToken = '${newRefreshToken}' where refreshToken = '${refreshToken}' `;
    return {
      name: 'updateTokens',
      type: 'UPDATE',
      query: query,
    };
  }

  getTotalSongs(id: number = null): DBQuery {
    let query = `select count(*) as total from ${TableName.Table_Album} where status IN (0,1) AND isCampaign = 0`;
    if (id) {
      query += ` AND userId = ${id}`;
    }
    return {
      name: 'getTotalSongs',
      type: 'SELECT_ONE',
      query: query,
    };
  }

  getTotalAlbum(id: number = null): DBQuery {
    let query = `select count(*) as total from ${TableName.Table_Album_Details} where status IN (0,1) AND isCampaign = 0`;
    if (id) {
      query += ` AND userId = ${id}`;
    }
    return {
      name: 'getTotalAlbum',
      type: 'SELECT_ONE',
      query: query,
    };
  }

  getTotalArtist(id: number = null): DBQuery {
    let query = `select count(*) as total from ${TableName.Table_Artist} where status IN (0,1) AND isCampaign = 0`;
    if (id) {
      query += ` AND creatorId = ${id}`;
    }
    return {
      name: 'getTotalArtist',
      type: 'SELECT_ONE',
      query: query,
    };
  }

  getTotalSongsAdmin(): DBQuery {
    let query = `select count(*) as total from ${TableName.Table_Album} `;
    return {
      name: 'getTotalSongsAdmin',
      type: 'SELECT_ONE',
      query: query,
    };
  }

  getTotalAlbumAdmin(id: number = null): DBQuery {
    let query = `select count(*) as total from ${TableName.Table_Album_Details}`;
    return {
      name: 'getTotalAlbumAdmin',
      type: 'SELECT_ONE',
      query: query,
    };
  }

  getTotalArtistAdmin(id: number = null): DBQuery {
    let query = `select count(*) as total from ${TableName.Table_Artist}`;

    return {
      name: 'getTotalArtistAdmin',
      type: 'SELECT_ONE',
      query: query,
    };
  }

  getProducdata(): DBQuery {
    let query = `select p.*,u.* from ${TableName.Table_Products} as p left join ${TableName.Table_Users} as u on p.user_id = u.userId where p.user_id = ? and p.status = 1 order by p.createddate desc`
    return {
      name: 'getproductdata',
      type: 'SELECT',
      query: query
    }
  }

  getallProducts(): DBQuery {
    let query = `select p.*,u.* from ${TableName.Table_Products} as p left join ${TableName.Table_Users} as u on p.user_id = u.userId where p.status = 1 order by p.createddate desc`
    return {
      name: 'getallProducts',
      type: 'SELECT',
      query: query
    }
  }

  getwalletTransaction(): DBQuery {
    let query = `select * from ${TableName.TABLE_WALLET_TRANSACTION} where idUser = ? and status = 0 `
    return {
      name: 'getwalletTransaction',
      type: 'SELECT_ONE',
      query: query
    }
  }

  walletTransaction(): DBQuery {
    let query = `insert into ${TableName.TABLE_WALLET_TRANSACTION} (idUser,transactionType,status,amount,extraDetails,transactionCategory,accountID) values (?,?,?,?,?,?,?)`
    return {
      name: 'walletTransaction',
      type: 'INSERT',
      query: query
    }
  }

  addProducts(): DBQuery {
    let query = `insert into ${TableName.Table_Products} (name,description,location,rating,user_id) values (?,?,?,?,?)`
    return {
      name: 'addProducts',
      type: 'INSERT',
      query: query
    }
  }

  wallet(): DBQuery {
    let query = `insert into ${TableName.TABLE_WALLET} (userId,totalBalance,pendingBalance) values(?,?,?)`
    return {
      name: 'wallet',
      type: 'INSERT',
      query: query
    }
  }

  updateWallet(): DBQuery {
    let query = `update ${TableName.TABLE_WALLET} set totalBalance = ? , pendingBalance = ? where userId = ?`
    return {
      name: 'updatewallet',
      type: 'UPDATE',
      query: query
    }
  }

  createAccount(): DBQuery {
    let query = `insert into ${TableName.TABLE_ACCOUNT_DETAILS} (idUser,bankName,accountNumber,accountHolderName,ifscCode,branchName) values(?,?,?,?,?,?)`
    return {
      name: 'createAccount',
      type: 'INSERT',
      query: query
    }
  }

  checkAccount(): DBQuery {
    let query = `select * from ${TableName.TABLE_ACCOUNT_DETAILS} where accountNumber = ?`
    return {
      name: 'getAccountdata',
      type: 'SELECT_ONE',
      query: query
    }
  }

  getAccounts(): DBQuery {
    let query = `select * from ${TableName.TABLE_ACCOUNT_DETAILS} where idUser = ? and status !=127 `
    return {
      name: 'getAccounts',
      type: 'SELECT',
      query: query
    }
  }

  getTransactionOnAaccountId(): DBQuery {
    let query = `select * from ${TableName.TABLE_WALLET_TRANSACTION} where accountID = ? and status = 0`
    return {
      name: 'getTransactionOnAaccountID',
      type: 'SELECT_ONE',
      query: query
    }
  }

  removeProduct(): DBQuery {
    let query = `update ${TableName.Table_Products} set status = 127 where user_id = ? and product_id = ?`
    return {
      name: 'removeProduct',
      type: 'UPDATE',
      query: query
    }
  }
}