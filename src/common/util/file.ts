import { BadRequestException } from '@nestjs/common';
import { extname } from 'path';

// export const imageRegex = /\.(jpg|jpeg|jfif|png|gif|svg|webp)$/;
export const pdfRegex = /\.(pdf)$/;
export const listAcceptFileUser = /\.(pdf|jpe?g|png|webp|mp4)$/i;
export const listAcceptFileAdmin = /\.(pdf|jpg|jpeg|png)$/;
export const maxSizeFileUploadAdmin = 10000000; // 10 MB
export const maxSizeFileUpload = 10000000; // 10MB // 1mb = 1 000 000 bytes

// Đang dể định dạng của name file = Math ramdom 10000 + date
export const editFileName = (req, file: Express.Multer.File, callback) => {
  // const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  callback(
    null,
    `${Math.floor(Math.random() * 10000)}${Date.now()}${fileExtName}`,
  );
};

/**
 * check type file upload
 * @returns
 */
export const imageFileFilter = (req, file: Express.Multer.File, callback) => {
  const fileSize = parseInt(req.headers['content-length']); // size : bytes
  if (!file.originalname.toLocaleLowerCase().match(listAcceptFileUser))
    return callback(new BadRequestException('Không đúng định dạng file'));
  if (fileSize > maxSizeFileUpload) {
    console.log(
      `file upload to server : ${
        fileSize / 1000000
      } MB more than default size file : ${maxSizeFileUpload / 1000000} MB`,
    );
    return callback(null, false);
  }

  callback(null, true);
};

export const imageFileFilterAdmin = (
  req,
  file: Express.Multer.File,
  callback,
) => {
  const fileSize = parseInt(req.headers['content-length']); // size : bytes
  if (!file.originalname.toLocaleLowerCase().match(listAcceptFileAdmin))
    return callback(new BadRequestException('Không đúng định dạng file'));
  if (fileSize > maxSizeFileUploadAdmin) {
    return callback(null, false);
  }
  callback(null, true);
};

export const PdfFileFilter = (req, file: Express.Multer.File, callback) => {
  if (!file.originalname.match(pdfRegex)) {
    return callback(new Error('Không đúng định dạng pdf'));
  }

  callback(null, true);
};

export interface CustomFileType extends Express.Multer.File {
  name: string;
}

export const toResponseFiles = (
  files: Array<CustomFileType>,
): Array<Partial<Express.Multer.File>> => {
  const response = [];
  files.forEach((file) => {
    const fileReponse = {
      filename: file.filename,
      minetype: file.mimetype,
      name: file.name,
    };
    response.push(fileReponse);
  });
  return response;
};

export const toResponseFile = (
  file: Express.Multer.File,
): Partial<Express.Multer.File> => {
  const fileReponse = {
    filename: file.filename,
    minetype: file.mimetype,
  };
  return fileReponse;
};
