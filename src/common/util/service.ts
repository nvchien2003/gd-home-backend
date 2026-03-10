import { getVideoDurationInSeconds } from 'get-video-duration';
import { exec } from 'child_process';
import * as fs from 'fs';
export const ___GENERATETHUMBNAILVIDEO = (
  fileName: string,
  fileNameConvert: string,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const pathFile = `${process.env.STATIC_FOLDER}/${fileName}`;
    const pathThumb = `${
      process.env.STATIC_FOLDER
    }/thumb${fileNameConvert.slice(0, fileNameConvert.length - 4)}.png`;
    console.log('pathThumb================>', pathThumb);
    console.log('pathFile================>', pathFile);
    fs.readFile(pathFile, function (err) {
      if (err) {
        reject(err);
      } else {
        console.log('run to here=======================>');

        const thumbnail = exec(
          'ffmpeg -f mp4 -i ' +
            pathFile +
            ' -ss 00:00:02 -frames:v 1 ' +
            `${pathThumb}`,
          (error) => {
            if (error) {
              console.log(
                'run to error ffmpeg file======================================>',
                error,
              );
              reject(error);
            }
          },
        );

        thumbnail.stdout.on('end', () => {
          fs.createReadStream(pathThumb);
          resolve(
            `thumb${fileNameConvert.slice(0, fileNameConvert.length - 4)}.png`,
          );
        });
      }
    });
  });
};

export const ___GETDURATIONVIDEO = async (
  pathFile: string,
): Promise<number> => {
  return await getVideoDurationInSeconds(pathFile);
};
