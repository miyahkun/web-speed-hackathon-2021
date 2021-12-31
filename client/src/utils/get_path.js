/**
 * @typedef {object} ImagePathSet
 * @property {string} avif
 * @property {string} jpg
 */

/**
 * @param {string} imageId
 * @returns {ImagePathSet}
 */

function getImagePath(imageId) {
  return {
    avif: `/images/${imageId}.avif`,
    jpg: `/images/${imageId}.jpg`,
  };
}

/**
 * @typedef {object} MoviePathSet
 * @property {string} gif
 * @property {string} webm
 */

/**
 * @param {string} movieId
 * @returns {MoviePathSet}
 */
function getMoviePath(movieId) {
  return {
    gif: `/movies/${movieId}.gif`,
    webm: `/movies/${movieId}.webm`,
  };
}

/**
 * @typedef {object} SoundPathSet
 * @property {string} mp3
 * @property {string} aac
 */

/**
 * @param {string} soundId
 * @returns {SoundPathSet}
 */
function getSoundPath(soundId) {
  return {
    mp3: `/sounds/${soundId}.mp3`,
    aac: `/sounds/${soundId}.aac`,
  };
}

/**
 * @typedef {object} ProfileImagePathSet
 * @property {string} avif
 * @property {string} jpg
 */

/**
 * @param {string} imageId
 * @returns {ProfileImagePathSet}
 */

function getProfileImagePath(profileImageId) {
  return {
    avif: `/images/profiles/${profileImageId}.avif`,
    jpg: `/images/profiles/${profileImageId}.jpg`,
  };
}

export { getImagePath, getMoviePath, getSoundPath, getProfileImagePath };
