import {
  forwardRef,
  Module,
  MiddlewareConsumer,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UsersQueries } from './user.query';
import { AuthService } from '../auth/auth.service';
import { NodeEmailerService } from '../../shared/services/node-emailer.service';
import { UploadModule } from '../general/upload/upload.module';
import { AuthMiddleware } from '../../common/middleware/auth.middleware';

@Module({
  imports: [forwardRef(() => UploadModule)],
  controllers: [UserController],
  providers: [UserService, UsersQueries, AuthService, NodeEmailerService],
  exports: [UserService],
})
// export class UserModule implements NestModule {
//   public configure(consumer: MiddlewareConsumer) {
//     console.log("Coming here");

//     consumer.apply(AuthMiddleware).forRoutes();
//   }
// }
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('User')
    // { path: '/User/update*', method: RequestMethod.PUT },
    // { path: '/User/changepassword*', method: RequestMethod.POST },
    // { path: '/User/delete*', method: RequestMethod.DELETE },
    // { path: '/User/dashboard', method: RequestMethod.GET },
    // { path: '/User/getUserWallet', method: RequestMethod.GET },
    // { path: '/User/getUserWalletTransection', method: RequestMethod.GET }
    // );
  }
}
