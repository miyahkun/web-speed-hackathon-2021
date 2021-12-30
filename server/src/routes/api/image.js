import { promises as fs } from 'fs';
import path from 'path';

import Router from 'express-promise-router';
import httpErrors from 'http-errors';
import { v4 as uuidv4 } from 'uuid';

import { convertImage } from '../../converters/convert_image';
import { UPLOAD_PATH } from '../../paths';

// 変換した画像の拡張子
const EXTENSIONS = ['jpg', 'avif'];

const router = Router();

router.post('/images', async (req, res) => {
  if (req.session.userId === undefined) {
    throw new httpErrors.Unauthorized();
  }
  if (Buffer.isBuffer(req.body) === false) {
    throw new httpErrors.BadRequest();
  }

  const imageId = uuidv4();

  EXTENSIONS.forEach(async (ext, i) => {
    let converted;
    if (i === 0) {
      converted = await convertImage(req.body, {
        extension: ext,
        height: undefined,
        width: undefined,
      });
    } else {
      converted = await convertImage(req.body, {
        extension: ext,
        height: 600,
        width: 600,
      });
    }

    const filePath = path.resolve(UPLOAD_PATH, `./images/${imageId}.${ext}`);
    await fs.writeFile(filePath, converted);
  });

  return res.status(200).type('application/json').send({ id: imageId });
});

export { router as imageRouter };
