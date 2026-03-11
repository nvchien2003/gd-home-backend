/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  BadRequestException,
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { FileUploadDto } from './file-upload.dto';
import { FileUploadService } from './file-upload.service';
import { AuthorizationGuard } from '../auth/authorization.guard';
import { CustomFileType, editFileName } from '../../common/util/file';
import { UserReq } from '../../common/decorators/user.decorator';
import { UserJwtDto } from '../auth/dto/auth.dto';

@ApiTags('api/file-upload')
@ApiBearerAuth()
@UseGuards(AuthorizationGuard)
@Controller()
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('upload')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: diskStorage({
        destination: `${process.env.STATIC_FOLDER || 'public/static'}`,
        filename: editFileName,
      }),
    }),
  )
  @ApiOperation({ summary: 'Upload file ( option selection mutiple file )' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ description: 'Upload file ', type: FileUploadDto })
  async uploadFileTemplate(
    @UploadedFiles() files: Array<CustomFileType>,
    @UserReq() userReq: UserJwtDto,
  ) {
    try {
      if (!files) throw new BadRequestException('false request');
      return await this.fileUploadService.create(files, userReq.id);
    } catch (error) {
      console.log('UPLOAD ERROR:', error);
      throw new BadRequestException(error);
    }
  }
}
