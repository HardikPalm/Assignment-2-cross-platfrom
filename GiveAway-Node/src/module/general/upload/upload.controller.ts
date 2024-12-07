'use strict';

import {
  Controller,
  Get,
  Post,
  Param,
  Res,
  UseInterceptors,
  // UploadedFile,
  UploadedFiles,
  UploadedFile,
  Logger,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import {
  filesRoot,
  editFileName,
  imageFileFilter,
  songFileFilter,
} from '../../../providers/file-upload.service';
import {
  /*ApiFile, */ ApiFile,
  ApiMultiFile,
} from '../../../common/swagger.schema';

import { UploadService } from './upload.service';
import { ConfigService } from '../../../shared/services/config.service';
// import { multerOptions } from "../../config/multer.config";

// import { FileUploadDto } from "./dto/FileUploadDto";

@Controller('upload')
@ApiTags('Upload')
export class UploadController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(
    private readonly uploadService: UploadService,
    private readonly configService: ConfigService,
  ) {}

  @Post('image')
  @ApiConsumes('multipart/form-data')
  @ApiFile()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: filesRoot() + '/local',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadMultipleFiles(@UploadedFile() file: Express.Multer.File) {
    const response = [];

    const temp_path = await this.uploadService.getTempPath();
    const temp_files = [];
    const filename = file.filename;
    const size = file.size;
    const originalname = file.originalname;
    const mimetype = file.mimetype;
    const destination = file.destination;
    const path = file.path;

    const bucket_name = this.configService.get('AWS_S3_BUCKET_NAME');

    const fileReponse = {
      originalName: originalname,
      fileName: filename,
      mimeType: mimetype,
      destination: destination,
      path: path,
      size: size,
    };
    response.push(fileReponse);

    const tempUploadInsert = await this.uploadService.addTempUpload(
      fileReponse,
    );
    temp_files.push({
      tokenId: tempUploadInsert.insertId,
      File: filename,
      Size: size,
      OriginalName: originalname,
      MimeType: mimetype,
      Action: 'Add',
    });
    //await this.uploadService.uploadTempFileTopS3(file);

    const Files = temp_files;

    return { status: true, Files };
  }

  @Post('song')
  @ApiConsumes('multipart/form-data')
  @ApiFile()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: filesRoot() + '/local',
        filename: editFileName,
      }),
      fileFilter: songFileFilter,
    }),
  )
  async uploadSongFile(@UploadedFile() file: Express.Multer.File) {
    const response = [];

    const temp_path = await this.uploadService.getTempPath();
    const temp_files = [];

    const filename = file.filename;
    const size = file.size;
    const originalname = file.originalname;
    const mimetype = file.mimetype;
    const destination = file.destination;
    const path = file.path;

    const bucket_name = this.configService.get('AWS_S3_BUCKET_NAME');

    const fileReponse = {
      originalName: originalname,
      fileName: filename,
      mimeType: mimetype,
      destination: destination,
      path: path,
      size: size,
    };
    response.push(fileReponse);

    const tempUploadInsert = await this.uploadService.addTempUpload(
      fileReponse,
    );
    temp_files.push({
      tokenId: tempUploadInsert.insertId,
      File: filename,
      Size: size,
      OriginalName: originalname,
      MimeType: mimetype,
      Action: 'Add',
    });
    //await this.uploadService.uploadTempFileTopS3(file);

    const Files = temp_files;

    return { status: true, Files };
  }

  @Post('multipleImages')
  @ApiConsumes('multipart/form-data')
  @ApiMultiFile()
  @UseInterceptors(
    FilesInterceptor('files', undefined, {
      storage: diskStorage({
        destination: filesRoot() + '/local',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadMultipleImageFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const response = [];

    const temp_files = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const filename = file.filename;
      const size = file.size;
      const originalname = file.originalname;
      const mimetype = file.mimetype;
      const destination = file.destination;
      const path = file.path;

      const fileReponse = {
        originalName: originalname,
        fileName: filename,
        mimeType: mimetype,
        destination: destination,
        path: path,
        size: size,
      };
      response.push(fileReponse);

      const tempUploadInsert = await this.uploadService.addTempUpload(
        fileReponse,
      );

      temp_files.push({
        tokenId: tempUploadInsert.insertId,
        file: filename,
        size: size,
        originalName: originalname,
        mimeType: mimetype,
        action: 'Add',
      });
    }
    const Files = temp_files;
    return { status: true, Files };
  }

  @Post('multipleSongs')
  @ApiConsumes('multipart/form-data')
  @ApiMultiFile()
  @UseInterceptors(
    FilesInterceptor('files', undefined, {
      storage: diskStorage({
        destination: filesRoot() + '/local',
        filename: editFileName,
      }),
      fileFilter: songFileFilter,
    }),
  )
  async uploadMultipleSongFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
  ) {
    const response = [];

    const temp_files = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const filename = file.filename;
      const size = file.size;
      const originalname = file.originalname;
      const mimetype = file.mimetype;
      const destination = file.destination;
      const path = file.path;

      const fileReponse = {
        originalName: originalname,
        fileName: filename,
        mimeType: mimetype,
        destination: destination,
        path: path,
        size: size,
      };
      response.push(fileReponse);

      const tempUploadInsert = await this.uploadService.addTempUpload(
        fileReponse,
      );

      temp_files.push({
        tokenId: tempUploadInsert.insertId,
        file: filename,
        size: size,
        originalName: originalname,
        mimeType: mimetype,
        action: 'Add',
      });
    }
    const Files = temp_files;
    return { status: true, Files };
  }
}
