import { DataTypes, Sequelize } from 'sequelize';

import { sequelize } from '../sequelize.js';

/**
 * @typedef {object} SoundAttributes
 * @property {string} id
 * @property {string} title
 * @property {string} artist
 * @property {json} stats
 */

/**
 * @typedef {import('sequelize').Model<SoundAttributes>} SoundModel
 */

/** @type {import('sequelize').ModelCtor<SoundModel>} */
const Sound = sequelize.define('Sound', {
  artist: {
    allowNull: false,
    defaultValue: 'Unknown',
    type: DataTypes.STRING,
  },
  id: {
    allowNull: false,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    type: DataTypes.UUID,
  },
  title: {
    allowNull: false,
    defaultValue: 'Unknown',
    type: DataTypes.STRING,
  },
  stats: {
    allowNull: false,
    defaultValue: {},
    type: DataTypes.JSON,
  },
});

export { Sound };
