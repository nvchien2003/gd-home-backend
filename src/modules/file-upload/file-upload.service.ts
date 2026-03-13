import { Injectable, BadRequestException } from '@nestjs/common';
import { MEDIA_TYPE } from '../../common/constant/constant';
import { MediasRepository } from '../repository/medias.repository';
import { CustomFileType, maxSizeFileUpload } from '../../common/util/file';
import cloudinary from '../../common/config/cloudinary.config';
import { Readable } from 'stream';

@Injectable()
export class FileUploadService {
  constructor(private mediasRepository: MediasRepository) {}

  private _renderTypeByMinType = (mimeType: string): number =>
    mimeType.includes('image/')
      ? MEDIA_TYPE.IMAGE
      : mimeType.includes('mp4')
        ? MEDIA_TYPE.VIDEO
        : MEDIA_TYPE.FILE;

  private async _uploadToCloudinary(file: CustomFileType, userId: string) {
    if (file.size > maxSizeFileUpload) {
      throw new BadRequestException('File too large');
    }

    return new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: `users/${userId}`,
          resource_type: 'auto',
          transformation: [
            {
              fetch_format: 'webp',
              quality: 'auto',
            },
          ],
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      Readable.from(file.buffer).pipe(stream);
    });
  }

  async create(files: CustomFileType[], userId: string) {
    const uploads = [];

    for (const file of files) {
      const result = await this._uploadToCloudinary(file, userId);

      uploads.push({
        url: result.secure_url,
        publicId: result.public_id,
        type: this._renderTypeByMinType(file.mimetype),
        mimeType: file.mimetype,
      });
    }

    return await this.mediasRepository.save(
      uploads.map((e) => ({
        url: e.url,
        name: e.publicId,
        type: e.type,
        user: { id: userId },
        attributes: e,
      })),
    );
  }
}
