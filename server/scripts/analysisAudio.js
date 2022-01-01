import fs from 'fs';
import path from 'path';
import { map as lMap, mean as lMean, chunk as lChunk, max as lMax, zip as lZip } from 'lodash';
import { AudioContext } from 'web-audio-api';

const fsPromise = fs.promises;

const SOUNDS_DIR = path.resolve(__dirname, '..', '..', 'public', 'sounds');
const EXTENSION = '.aac';

export const analysisAudio = async () => {
  const dirents = await fsPromise.readdir(SOUNDS_DIR, { withFileTypes: true });
  const targetDirents = dirents
    .filter((ent) => ent.isFile())
    .filter((ent) => path.extname(ent.name).toLowerCase() === EXTENSION);

  const resultPromise = await targetDirents.map(async (ent) => {
    const fileBuffer = fs.readFileSync(path.resolve(SOUNDS_DIR, ent.name));
    const { max, peaks } = await calculate(fileBuffer);

    console.log(`Passed: ${ent.name}, Max: ${max}, Peaks: ${peaks.length}`);

    return {
      id: path.basename(ent.name, '.aac'),
      stats: {
        max,
        peaks,
      },
    };
  });

  const result = await Promise.all(resultPromise);

  await fs.writeFileSync(path.resolve(__dirname, '..', 'seeds', 'soundStats.json'), JSON.stringify(result));
};

/**
 * @param {Buffer} data
 * @returns {Promise<{ max: number, peaks: number[] }}
 */
async function calculate(data) {
  const audioCtx = new AudioContext();

  /** @type {AudioBuffer} */
  const buffer = await new Promise((resolve, reject) => {
    audioCtx.decodeAudioData(data.buffer.slice(0), resolve, reject);
  });

  const leftData = lMap(buffer.getChannelData(0), Math.abs);
  const rightData = lMap(buffer.getChannelData(1), Math.abs);

  const normalized = lMap(lZip(leftData, rightData), lMean);
  const chunks = lChunk(normalized, Math.ceil(normalized.length / 100));

  const peaks = lMap(chunks, lMean);
  const max = lMax(peaks);

  return { max, peaks };
}
