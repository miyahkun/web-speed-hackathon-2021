import fs from 'fs/promises';

import comments from '../seeds/comments.json';
import images from '../seeds/images.json';
import movies from '../seeds/movies.json';
import posts from '../seeds/posts.json';
import postsImagesRelation from '../seeds/postsImagesRelation.json';
import profileImages from '../seeds/profileImages.json';
import users from '../seeds/users.json';

import { createSoundWithStatsSeed } from '../scripts/createSoundWithStatsSeed.js';

import { Comment, Image, Movie, Post, PostsImagesRelation, ProfileImage, Sound, User } from './models/index.js';

async function prepareSoundStats() {
  const soundSeed = await createSoundWithStatsSeed();
  const result = JSON.parse(await fs.readFile(soundSeed, { encoding: 'utf-8' }));
  return result;
}

async function insertSeeds() {
  const sounds = await prepareSoundStats();

  await ProfileImage.bulkCreate(profileImages, { logging: false });
  await Image.bulkCreate(images, { logging: false });
  await Movie.bulkCreate(movies, { logging: false });
  await Sound.bulkCreate(sounds, { logging: false });
  await User.bulkCreate(users, { logging: false });
  await Post.bulkCreate(posts, { logging: false });
  await PostsImagesRelation.bulkCreate(postsImagesRelation, { logging: false });
  await Comment.bulkCreate(comments, { logging: false });
}

export { insertSeeds };
