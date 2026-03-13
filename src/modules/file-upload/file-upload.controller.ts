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
import { memoryStorage } from 'multer';
import { FileUploadDto } from './file-upload.dto';
import { FileUploadService } from './file-upload.service';
import { AuthorizationGuard } from '../auth/authorization.guard';
import { CustomFileType } from '../../common/util/file';
import { UserReq } from '../../common/decorators/user.decorator';
import { UserJwtDto } from '../auth/dto/auth.dto';

@ApiTags('api/file-upload')
@ApiBearerAuth()
@UseGuards(AuthorizationGuard)
@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('upload')
  @UseInterceptors(
    AnyFilesInterceptor({
      storage: memoryStorage(),
      limits: {
        fileSize: 50 * 1024 * 1024,
      },
    }),
  )
  @ApiOperation({ summary: 'Upload multiple files' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ description: 'Upload file', type: FileUploadDto })
  async uploadFileTemplate(
    @UploadedFiles() files: Array<CustomFileType>,
    @UserReq() userReq: UserJwtDto,
  ) {
    try {
      if (!files || files.length === 0) {
        throw new BadRequestException('No files uploaded');
      }

      return await this.fileUploadService.create(files, userReq.id);
    } catch (error) {
      console.log('UPLOAD ERROR:', error);
      throw new BadRequestException(error.message);
    }
  }
}
