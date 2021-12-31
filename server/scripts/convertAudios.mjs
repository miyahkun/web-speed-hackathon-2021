import fs from 'fs/promises';
import path from 'path';
import process from 'process';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const MOVIES_DIR = path.resolve(process.cwd(), 'public', 'sounds');
const EXTENSION = 'aac';

const ffmpeg = createFFmpeg({ log: true });

const output = (basename) => `${basename}.${EXTENSION}`;

const asyncGen = async function* (promises) {
  for (const promise of promises) {
    yield await promise();
  }
};

const init = async () => {
  const basenameList = (await fs.readdir(MOVIES_DIR)).map((file) => path.basename(file, '.mp3'));

  await ffmpeg.load();

  const result = [];

  const promises = basenameList.map((basename) => {
    return async () => {
      const source = path.resolve(MOVIES_DIR, `${basename}.mp3`);
      const target = path.resolve(MOVIES_DIR, output(basename));

      ffmpeg.FS('writeFile', basename, await fetchFile(source));

      await ffmpeg.run('-i', basename, '-c:a', 'libfdk_aac', '-b:a', '32k', '-vn', output(basename));
      await fs.writeFile(target, ffmpeg.FS('readFile', output(basename)));

      ffmpeg.FS('unlink', basename);
      ffmpeg.FS('unlink', output(basename));
    };
  });

  for await (const res of asyncGen(promises)) {
    result.push(res);
  }

  process.exit(0);
};

init();
