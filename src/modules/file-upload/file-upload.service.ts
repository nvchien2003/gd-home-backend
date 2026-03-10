/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, BadRequestException } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as sharp from 'sharp';
import { MEDIA_TYPE } from '../../common/constant/constant';
import { MediasRepository } from '../repository/medias.repository';
import { CustomFileType, maxSizeFileUpload } from '../../common/util/file';
import {
  ___GENERATETHUMBNAILVIDEO,
  ___GETDURATIONVIDEO,
} from '../../common/util/service';

@Injectable()
export class FileUploadService {
  constructor(private mediasRepository: MediasRepository) {}
  private _renderTypeByMinType = (mimeType: string): number =>
    mimeType.includes('image/')
      ? MEDIA_TYPE.IMAGE
      : mimeType.includes('mp4/')
        ? MEDIA_TYPE.VIDEO
        : MEDIA_TYPE.FILE;

  private async _convertFileMedia(files: CustomFileType[], userId: string) {
    console.log('START _convertFileMedia');

    const result = [];

    for (let i = 0; i < files.length; i++) {
      console.log('Loop file index:', i);

      const file = files[i];
      console.log('File info:', file);

      const fileExt = file.filename.split('.').pop()?.toLowerCase();
      const mimeType = file.mimetype;
      const fileSize = file.size;

      console.log('fileExt:', fileExt);
      console.log('mimeType:', mimeType);
      console.log('fileSize:', fileSize);

      if (!file.originalname.toLowerCase().endsWith(`.${fileExt}`)) {
        console.log('FORMAT ERROR');
        throw new BadRequestException({
          errorCode: 'not format file',
        });
      }

      if (fileSize > maxSizeFileUpload) {
        console.log('SIZE ERROR');
        throw new BadRequestException({
          errorCode: 'max size',
        });
      }

      let fileName = path.parse(file.originalname).name.replace(/ /g, '');
      console.log('Original fileName:', fileName);

      const FOMAT_FILE_NAME = `${userId}__${fileName}-${Date.now()}.${fileExt}`;
      console.log('FOMAT_FILE_NAME:', FOMAT_FILE_NAME);

      if (mimeType.includes('mp4')) {
        console.log('Processing video');

        const thumb = await ___GENERATETHUMBNAILVIDEO(file.filename, fileName);
        const duration = await ___GETDURATIONVIDEO(
          `${file.destination}/${file.filename}`,
        );

        console.log('Thumb:', thumb);
        console.log('Duration:', duration);

        result.push({
          path: `${file.destination}/${file.filename}`,
          fileName: fileName,
          mimeType: mimeType,
          type: this._renderTypeByMinType(mimeType),
          fileNameThumb: thumb,
          duration: Math.floor(duration * 1000),
        });
      } else {
        console.log('Processing image');

        fileName = await this._convertImagesToWebp(
          file.filename,
          FOMAT_FILE_NAME,
        );

        console.log('Converted image name:', fileName);

        result.push({
          path: `${file.destination}/${fileName}`,
          fileName: fileName,
          mimeType: mimeType,
          type: this._renderTypeByMinType(mimeType),
          fileNameThumb: null,
          duration: null,
        });
      }
    }

    console.log('RESULT:', result);

    return result;
  }

  async create(files: CustomFileType[], userId: string) {
    console.log('---');
    const listMedias = await this._convertFileMedia(files, userId);
    console.log('-----lis', listMedias);
    return await this.mediasRepository.save(
      listMedias.map((e) => ({
        url: e.fileName,
        name: e.fileName,
        type: e.type,
        user: { id: userId },
        attributes: e,
      })),
    );
  }

  /**
   * TODO : Convert file images to webp
   * @param nameFile : string
   * @returns
   */
  private async _convertImagesToWebp(
    nameFile: string,
    nameFileConvert: string,
  ) {
    const _file = await fs.readFileSync(
      `${process.env.STATIC_FOLDER}/${nameFile}`,
    );
    const _convertNameFile = nameFileConvert.split('.').shift() + '.webp';

    await Promise.all([
      fs.unlinkSync(`${process.env.STATIC_FOLDER}/${nameFile}`),
      sharp(_file)
        // .resize(800) // comment out resize
        .webp({ effort: 3 })
        .toFile(path.join(process.env.STATIC_FOLDER, _convertNameFile)),
    ]);
    return _convertNameFile;
  }
}
