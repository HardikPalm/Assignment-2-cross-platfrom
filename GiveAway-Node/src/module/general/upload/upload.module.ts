import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';

import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { UploadQuery } from './query';
import { AuthMiddleware } from '../../../common/middleware/auth.middleware';
import { UsersQueries } from '../../user/user.query';
@Module({
  controllers: [UploadController],
  providers: [UploadService, UploadQuery, UsersQueries],
  exports: [UploadService],
})

export class UploadModule implements NestModule {

  configure(consumer: MiddlewareConsumer) {
    // consumer
    //   .apply(AuthMiddleware)
    // .forRoutes({ path: '/**', method: RequestMethod.ALL });

  }

}

