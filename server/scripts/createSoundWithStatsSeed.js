import { analysisAudio } from './analysisAudio.js';
import fs from 'fs/promises';
import path from 'path';
import { merge, keyBy, values } from 'lodash';

export const createSoundWithStatsSeed = async () => {
  const seedPath = path.resolve(__dirname, '..', 'seeds', 'sounds.json');
  const statsPath = path.resolve(__dirname, '..', 'seeds', 'soundStats.json');

  // await analysisAudio();

  const soundSeed = JSON.parse(await fs.readFile(seedPath, { encoding: 'utf-8' }));
  const soundStatsSeed = JSON.parse(await fs.readFile(statsPath, { encoding: 'utf-8' }));

  const merged = merge(keyBy(soundSeed, 'id'), keyBy(soundStatsSeed, 'id'));
  const result = values(merged);

  const dest = path.resolve(__dirname, '..', 'seeds', 'soundWithStats.json');
  await fs.writeFile(dest, JSON.stringify(result));

  return dest;
};
