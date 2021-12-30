import sharp from 'sharp';
import fs from 'fs/promises';
import glob from 'glob';
import path from 'path';

const TARGET_FILE_PTR = glob.sync('../public/images/**/*.jpg');
const TARGET_FILE_PATH = TARGET_FILE_PTR.map((imgPath) => imgPath.split('/'));

const targetDirSet = new Set();

TARGET_FILE_PATH.forEach((p) => {
  const dir_arr = p.slice(0, p.length - 1).join('/');
  targetDirSet.add(dir_arr);
});

const TARGET_DIR = Array.from(targetDirSet);

const convert2Webp = (imgDir, targetFilename) => {
  const imgPath = path.resolve(imgDir, targetFilename);
  const outPath = path.resolve(imgDir, `${getBasename(targetFilename)}.webp`);

  sharp(imgPath)
    .resize({
      fit: 'outside',
      width: 600,
      height: 600,
    })
    .webp({
      quality: 80,
    })
    .toFile(outPath, (err) => {
      if (err) {
        console.error(err);
      }
    });
};

const convert2Avif = (imgDir, targetFilename) => {
  const imgPath = path.resolve(imgDir, targetFilename);
  const outPath = path.resolve(imgDir, `${getBasename(targetFilename)}.avif`);

  sharp(imgPath)
    .resize({
      fit: 'outside',
      width: 600,
      height: 600,
    })
    .avif({
      quality: 80,
    })
    .toFile(outPath, (err) => {
      if (err) {
        console.error(err);
      }
    });
};

const resize = (imgDir, targetFilename) => {
  const imgPath = path.resolve(imgDir, targetFilename);
  const outPath = path.resolve(imgDir, `${getBasename(targetFilename)}.webp`);
  const resizedOutPath = path.resolve(imgDir, `${getBasename(targetFilename)}__middle.webp`);

  sharp(imgPath)
    .resize({
      fit: 'outside',
      width: 600,
      height: 600,
    })
    .toFile(outPath, (err) => {
      if (err) {
        console.error(err);
      }
    });
};

const getBasename = (filename) => {
  return filename.split('.').slice(0, -1)[0];
};

async function writeFiles() {
  TARGET_DIR.forEach((targetDir) => {
    fs.readdir(targetDir, { withFileTypes: true })
      .then((files) => {
        files
          .filter((dirent) => dirent.isFile())
          .filter((dirent) => files.every((file) => file.name !== `${getBasename(dirent.name)}.avif`))
          .forEach((dirent) => {
            convert2Avif(`${targetDir}`, dirent.name);
          });
      })
      .catch((err) => {
        console.log('err', err);
      });
  });
}

async function init() {
  await writeFiles();
}

init();
