/**
 * @typedef {object} ImagePathSet
 * @property {string} webp
 * @property {string} jpg
 */

/**
 * @param {string} imageId
 * @returns {ImagePathSet}
 */

function getImagePath(imageId) {
  return {
    avif: `/images/${imageId}.avif`,
    webp: `/images/${imageId}.webp`,
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
 * @param {string} soundId
 * @returns {string}
 */
function getSoundPath(soundId) {
  return `/sounds/${soundId}.mp3`;
}

/**
 * @param {string} profileImageId
 * @returns {string}
 */
function getProfileImagePath(profileImageId) {
  return `/images/profiles/${profileImageId}.jpg`;
}

export { getImagePath, getMoviePath, getSoundPath, getProfileImagePath };
