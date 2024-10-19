const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('@config/db_config.js')

const FavoriteStory = sequelize.define(
  'FavoriteStory',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    story_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'favorite_stories',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
)

module.exports = FavoriteStory
