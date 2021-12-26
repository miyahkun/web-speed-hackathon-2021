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
    webp: `/images/${imageId}.webp`,
    jpg: `/images/${imageId}.jpg`,
  };
}

/**
 * @param {string} movieId
 * @returns {string}
 */
function getMoviePath(movieId) {
  return `/movies/${movieId}.gif`;
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
