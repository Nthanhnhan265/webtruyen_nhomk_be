const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('@config/db_config.js')

const StoryGenre = sequelize.define(
  'StoryGenre',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    story_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    genre_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'story_genres',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
)

module.exports = StoryGenre
